import mongoose from "mongoose";
import House from "../models/House.js"
import Requests from "../models/VisitorRequest.js";
import { createError } from "../utils/CreateError.js";
import { removeImage } from "../utils/fileProcessing.js";
import { paginate } from "../utils/pagination.js";

export const createHouse = async (req, res, next) => {
    try {    
        const owner = req.user;
        console.log(req.body,'body')
        let {
            no_of_rooms, 
            no_of_bath_rooms,
            width,
            length,
            house_type,
            bankaccounts,
            address,
            rent_amount,
            description
        } = req.body;

        address = JSON.parse(address);
        bankaccounts = JSON.parse(bankaccounts);
        
        const images = req.files.map(file => ({url: 'uploads/'+file.filename, path: file.destination}));
        
        const newHouse = await House.create({
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

        return res.status(200).json({msg: "Successfully Created", data: newHouse});
    } catch(error) {
        next(error)
    } 
}

export const getHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const house = await House.findById(id).select('-occupancy_history -bankaccounts -deadline -contract');
        if(!house)
            throw createError(404,'house not found');

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
        const houses = await House.find({tenant: null});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const start = (page-1) * limit
        const total = await houses.count()
        const data = await houses
        .skip(start)
        .limit(limit).select('-occupancy_history -bankaccounts -deadline -contract -calendar')
        .populate({
            path: 'owner',
            select: '-role -password -isActive',
            model: 'users',
            foreignField: '_id'
        });
        
        const result = paginate(page, limit, total, data);        
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
};

export const editHouseInfo = async (req, res, next) => {
    try {
        let { 
            name,
            no_of_rooms, 
            no_of_bath_rooms,
            width,
            length,
            house_type,
            bankaccounts,
            description,
            address,
        } = req.body;

        if (bankaccounts)
            bankaccounts = JSON.parse(bankaccounts) 
        if (address)
            address = JSON.parse(address)

        const houseid = req.params.houseid;
        const house = await House.findOne({house: houseid, owner: req.user});

        house.name = name || house.name;
        house.no_of_rooms = no_of_rooms || house.no_of_rooms;
        house.no_of_bath_rooms = no_of_bath_rooms || house.no_of_bath_rooms;
        house.width = width || house.width;
        house.length = length || house.length;
        house.house_type = house_type || house.house_type;
        house.description = description || house.description

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
        const house = await House.findOne({_id: req.params.houseid, owner: req.user});
        let images = house.images;
        
        images.forEach( async ({url, path}) => {
            if (deletedImages.has(url))
                await removeImage(path)
        });
        images = images.filter(({url, path}) => !deletedImages.has(url));
        
        const addedImages = req.files.map(file => ({url: 'uploads/'+file.filename, path: file.destination}));
        addedImages.forEach((image) => {
            images.push(image);
        });

        house.images = images;
        await house.save();
        return res.status(200).json({msg: 'Successfully updated photos', data: house.images} )
    } catch (error) {
        next(error);
    }
}

export const addHouseCalendar = async (req, res, next) => {
    try {
        let {isOpen, schedules} = req.body;
        schedules = JSON.parse(schedules);
        
        const house = await House.findOne({owner: req.user, _id: req.params.houseid});

        if(!house)
            throw createError(400, "House not found!!");

        let schedule = house.calendar.schedule;
        if (schedule.length < 7)
            schedule = Array(7).fill(null)
        
        schedules.forEach(({day, starttime, endtime}) => {
            if (day < 0 || day > 6)
                throw createError(400, "Invalid day");
            
            if (!(3 < starttime.hour < 24 && 3 < endtime < 24))
                throw createError(400, "Please set the time properly")
            if (starttime.hour >= endtime.hour)
                throw createError(400, 'There must be morethan one hour difference between the two');
            schedule[day] = {
                starttime: new Date().setHours(starttime.hour, starttime.minute, 0, 0),
                endtime: new Date().setHours(endtime.hour, endtime.minute, 0, 0),
            }
        });

        house.calendar = {
            open: isOpen || house.open,
            schedule,
        }
        await house.save()
        return res.status(201).json({message: "Successfully set calendar!", data: house.calendar});
    } catch (error) {
        next(error)
    }
}

export const getHouseVisits = async (req, res, next) => {
    try {
        const house = mongoose.Schema.Types.ObjectId(req.params.id)
        const requests = await Requests.aggregate([
            {$match: {
                house: house
            }},
            {$addFields: {
                truncDate: {$dateTrunc: {
                    date: '$date',
                    unit: 'day'
                }},
                hour: {$hour: '$date'}
            }},
            {$project: {
                visitor: 0,
                message: 0,
                house: 0
            }},
            {$sort: {
                hour: 1
            }},
            {$group: {
                _id: '$truncDate',
                requests: {$push: {
                    date: '$date',
                }},
                count: {$sum: 1}
            }}
        ]);

        return res.status(200).json(requests);
    } catch (error) {
        next(error);
    }
}

export const deleteHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedHouse = await House.findByIdAndDelete(id);

       return res.status(200).json({message:"successfully deleted"});
    } catch (error) {
        return next(error);
    }
};

