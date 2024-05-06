import House from "../models/House.js"
import User from "../models/User.js"
import { createError } from "../utils/CreateError.js";
import { paginate } from "../utils/pagination.js";

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
        const [result, start, size] = paginate(req.query, 30);
        const houses = await House.find({tenant: null}).skip(start)
        .limit(size).select('-occupancy_history -bankaccounts -deadline -contract -calendar');

        await houses.populate({
            path: 'owner', 
            foreignField: 'user',
            select: '-national_id',
            populate: {
                path: 'user',
                select: '-role -password -isActive'
            }
        });
        
        result.data = houses;
        return res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
};

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

export const editHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedHouse = await House.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedHouse) {
            return next(createError(500, 'Error while updating'));
        }

        return res.status(200).json(updatedHouse);
    } catch (error) {
        return next(error);
    }
};
export const deleteHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedHouse = await House.findByIdAndDelete(id);

       return res.status(200).json({message:"successfully deleted"});
    } catch (error) {
        return next(error);
    }
};

