import mongoose from "mongoose";
import House from "../models/House.js"
import Requests from "../models/VisitorRequest.js";
import { createError } from "../utils/CreateError.js";
import { removeImage } from "../utils/fileProcessing.js";
import { paginate } from "../utils/pagination.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


export const createHouse = async (req, res, next) => {
    try {
        const owner = req.user;
        let {
            no_of_rooms,
            no_of_bath_rooms,
            width,
            length,
            house_type,
            bankaccounts,
            address,
            rent_amount,
            description,
            housenumber
        } = req.body;
        address = JSON.parse(address);
        bankaccounts = JSON.parse(bankaccounts);
        const images = req.files.map(file => ({ url: 'uploads/' + file.filename, path: file.destination + "/" + file.filename }));
        if (!images || images.length === 0)
            throw createError(400, "Atleast one image is mandatory!")

        const newHouse = await House.create({
            housenumber,
            owner,
            no_of_rooms,
            no_of_bath_rooms,
            width,
            length,
            images,
            house_type,
            bankaccounts,
            rent_amount,
            description,
            address
        });

        return res.status(200).json(newHouse);
    } catch (error) {
        req.files.forEach(async file => await removeImage(file.destination + '/' + file.filename))
        next(error)
    }
}

export const latestHouses = async (req, res, next) => {
    try {
        const houses = await House.find().populate({
            path: 'owner',
            select: '-role -password -isActive',
            model: 'User',
            foreignField: '_id'
        }).sort({ createdAt: -1 }).limit(10);

        res.status(200).json(houses);
    } catch (error) {
        next(error);
    }
};

export const getHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const house = await House.findById(id).select('-occupancy_history -bankaccounts -deadline -contract');
        if (!house)
            throw createError(404, 'house not found');

        await house.populate({
            path: 'owner',
            foreignField: 'user',
            select: '-national_id ',
            populate: {
                path: 'user',
                select: '-role -password -isActive'
            }
        });

        return res.status(200).json(house);
    } catch (error) {
        return next(error);
    }
};

export const getHouses = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const start = (page - 1) * limit;
        // If this doesn't work use DocumentCount({tenant: null})
        const total = await House.find({ tenant: null }).estimatedDocumentCount();

        const data = await House.find({ tenant: null })
            .skip(start)
            .limit(limit).select('-occupancy_history -bankaccounts -deadline -contract -calendar')
            .populate({
                path: 'owner',
                select: '-role -password -isActive',
                model: 'User',
                foreignField: '_id'
            });
        console.log(data)
        const result = paginate(page, limit, total, data);
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
};

export const editHouseInfo = async (req, res, next) => {
    try {
        let {
            housenumber,
            no_of_rooms,
            no_of_bath_rooms,
            width,
            length,
            house_type,
            bankaccounts,
            description,
            address,
            rent_amount
        } = req.body;
        console.log(rent_amount)
        if (bankaccounts)
            bankaccounts = JSON.parse(bankaccounts)
        if (address)
            address = JSON.parse(address)

        const houseid = req.params.houseid;
        const house = await House.findOne({ _id: houseid, owner: req.user });
        // console.log("house", house);
        house.housenumber = housenumber || house.housenumber;
        house.no_of_rooms = no_of_rooms || house.no_of_rooms;
        house.no_of_bath_rooms = no_of_bath_rooms || house.no_of_bath_rooms;
        house.width = width || house.width;
        house.length = length || house.length;
        house.house_type = house_type || house.house_type;
        house.description = description || house.description;
        house.rent_amount = rent_amount || house.rent_amount;

        await house.save();
        return res.status(200).json(house);
    } catch (error) {
        next(error);
    }
}

export const editHouseImages = async (req, res, next) => {
    try {
        let { deletedImages } = req.body;
        deletedImages = new Set(JSON.parse(deletedImages));
        const house = await House.findOne({ _id: req.params.houseid, owner: req.user });
        let images = house.images;

        images.forEach(async ({ url, path }) => {
            if (deletedImages.has(url))
                await removeImage(path)
        });
        images = images.filter(({ url, path }) => !deletedImages.has(url));

        const addedImages = req.files.map(file => ({ url: 'uploads/' + file.filename, path: file.destination + "/" + file.filename }));
        addedImages.forEach((image) => {
            images.push(image);
        });

        house.images = images;
        await house.save();
        return res.status(200).json({ msg: 'Successfully updated photos', data: house.images })
    } catch (error) {
        next(error);
    }
}

export const addHouseCalendar = async (req, res, next) => {
    try {
        let { isOpen, schedules } = req.body;
        
        schedules = typeof schedules === 'string' ? JSON.parse(schedules) : schedules;
        const house = await House.findOne({ owner: req.user, _id: req.params.houseid });

        if (!house)
            throw createError(400, "House not found!!");

        let schedule = Array(7).fill(null);

        schedules.forEach(({ starttime, endtime, idx }) => {
            starttime = new Date(starttime);
            endtime = new Date(endtime);

            if ((starttime.getHours()+3)%24 >= (3+endtime.getHours())%24)
                throw createError(400, 'There must be morethan one hour difference between the two');

            schedule[idx] = {
                starttime,
                endtime
            }
        });

        house.calendar = {
            open: isOpen || house.open,
            schedule,
        }
        await house.save()
        return res.status(201).json({ message: "Successfully set calendar!", data: house.calendar });
    } catch (error) {
        next(error)
    }
}

export const getHouseVisits = async (req, res, next) => {
    try {
        const house = new mongoose.Types.ObjectId(req.params.id);
        if (req.headers.authorization) {
            const access_token = req.headers.authorization.split(' ')[1];
            jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
                if (err)
                    return res.status(401).json('Unauthenticated access');

                req.user = decoded.user;
            });
        }


        const requests = await Requests.aggregate([
            {
                $match: {
                    house,
                    visitor: { $ne: new mongoose.Types.ObjectId(req.user) }
                }
            },
            {
                $addFields: {
                    truncDate: {
                        $dateTrunc: {
                            date: '$date',
                            unit: 'day'
                        }
                    },
                    hour: { $hour: '$date' }
                }
            },
            {
                $project: {
                    visitor: 0,
                    message: 0,
                    house: 0
                }
            },
            {
                $sort: {
                    hour: 1
                }
            },
            {
                $group: {
                    _id: '$truncDate',
                    requests: {
                        $push: {
                            date: '$date',
                        }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json(requests);
    } catch (error) {
        next(error);
    }
}

export const deleteHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const house = await House.findOne({ _id: id, owner: req.user });
        if (!house)
            throw createError(400, 'House not found');
        await house.deleteOne();
        return res.status(200).json({ message: "successfully deleted" });
    } catch (error) {
        return next(error);
    }
};

