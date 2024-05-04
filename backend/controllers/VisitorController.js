import House from "../models/House.js";
import User from "../models/User.js";
import Requests from "../models/VisitorRequest.js";
import { createError } from "../utils/CreateError.js";

export const craeteVisitorRequest = async (req, res, next) => {
    try {
        const date = new Date(req.body.date);

        const house = await House.findById(req.params.houseid);
        const visitor = await User.findById(req.user);

        const schedule = house.calendar.schedule;
        const day = schedule[date.getUTCDay()];
        if (!day)
            throw createError(402, "The house have no schedule this day");

        const diff = day.endtime - day.starttime;
        const inMinutes = Math.ceil( diff / 60000)

        const start = new Date().setHours(day.starttime.getHours(), day.starttime.getMinutes(), 0 ,0);

        const end = new Date().setHours(day.starttime.getHours() + Math.floor(inMinutes/60), day.starttime.getMinutes()+inMinutes%60, 0 ,0);
        const current = new Date().setHours(date.getHours(), date.getMinutes(), 0, 0);

        
        if (current<start || current > end)
            throw createError(400, "The house have no schedule this time")
        
        console.log(date.getMonth(), date.getDate());
        const schedules = await Requests.aggregate([
            {
                $addFields:{
                    month: {$month:'$date'},
                    day: {$dayOfMonth: '$date'},
                    hour: {$hour: '$date'}
                },
            },  {
                $match: {
                    month: date.getMonth()+1,
                    day: date.getDate()
                },
            },  {
                $sort: {
                    hour: 1
                }
            }
        ]);
        
        const endtime = new Date(date)
        endtime.setHours(endtime.getHours()+1, endtime.getMinutes(), 0, 0)
        for(let index = 0; index < schedules.length; index ++) {
            if (schedules[index].visitor.toString() === visitor._id.toString())
                continue

            const s = new Date(schedules[index].date);
            const e = new Date(schedules[index].date);
            e.setHours(s.getHours() + 1, s.getMinutes(), 0, 0);

            if ((s<date && date<e) || (s<endtime && endtime<e))
                throw createError(400, "This time interfeers with another time!")
        }
        await Requests.deleteOne({
            visitor: visitor._id,
            house: house._id,
        });
        const request = await Requests.create({
            visitor,
            house,
            date,
        });
        return res.status(200).json({msg: `Successfully booked`, data: request});
    } catch (error) {
        next(error)
    }
}

export const getAllRequests = async (req, res, next) => {
    try {
        const requests = await Requests.find({visitor: req.user}).populate([
            {
                path: 'house',
                select: '-tenant -deadline -contract -occupancy_history'
            },{
                path: 'visitor',
                select: '-role -password -isActive'    
            }
        ])
        return res.status(200).json(requests);
    } catch (error) {
        next(error)
    }
}

export const deleteRequest = async (req, res, next) => {
    try {
        const deleted = await Requests.findByIdAndDelete(req.params.id)
        return res.status(204).json({msg: "Deleted", data: deleted})
    } catch(error) {
        next(error);
    }
}