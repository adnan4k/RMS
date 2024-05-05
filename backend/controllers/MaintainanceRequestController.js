import mongoose from "mongoose";
import House from "../models/House.js";
import Maintenance from "../models/Maintenance.js";
import { createError } from "../utils/CreateError.js";



export const createMaintainance = async(req,res,next)=>{
    const {description} = req.body;
     try {
        const tenantid = req.user;
        const house = House.findOne({tenant: tenantid}).select('-calendar -occupancy_history')
        const maintainace = new Maintenance({
            house_id: house,
            tenant_id: tenantid,
            description:description
        })
          
        const savedMaintainance = await maintainace.save();
        // if(!savedMaintainance)
        //     throw createError(500,'something went wrong while saving');

        return res.status(201).json(savedMaintainance)
     } catch (error) {
        next(error)
     }
}

export const getMaintenanceRequest = async(req,res,next) =>{
    try {
        const ownerId = new mongoose.Types.ObjectId(req.user);
        
        const maintenanceRequests = await Maintenance.aggregate([
            {
                $group: {
                    _id: "$house_id",
                    requests: {$push: "$$ROOT"}
                }
            },
            {
                $project: {
                    'requests.house_id': 0,
                }
            },
            {
                $lookup: {
                    from: 'houses',
                    localField: '_id',
                    foreignField: '_id',
                    pipeline: [{
                        $replaceRoot: {
                            newRoot: {
                                name: '$name',
                                images: '$images',
                                owner: '$owner',
                            }
                        }
                    }],
                    as: 'house',
                }
            },
            {
                $unwind: '$house'
            },
            {
                $match: {
                    "house.owner": ownerId, 
                }
            },
            {
                $unwind: '$requests'
            },
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'requests.tenant_id',
                    pipeline: [
                        {
                            $project: {
                                password: 0,
                                isActive: 0,
                                role: 0
                            }
                        }
                    ],
                    as: 'tenant'
                }
            },
            {
                $unwind: '$tenant'
            },
            {
                $group: {
                    _id: '$house',
                    requests: {$push: {
                        status: '$requests.status',
                        description: '$requests.description',
                        date_of_request: '$requests.date_of_request',
                        tenant: '$tenant'  
                    }}
                }
            },
            {
                $project: {
                    house: '$_id',
                    _id: 0,
                    requests: 1
                }
            },
            {
                $sort: {
                    'requests.date': 1
                }
            }
        ]);
        
        res.status(200).json(maintenanceRequests)
    } catch (error) {
        next(error);
    }
}

export const tenantRequests = async (req, res, next) => {
    try {
        const requests = await Maintenance.find({tenant: req.user}).select('date_of_request status description').sort({date_of_request:1});
        return res.status(200).json(requests)
    } catch (error) {
        next(error)
    }
} 

export const getAllMaintenanceRequests = async(req,res,next) =>{
    try {
         const allRequest = await Maintenance.find();
         if(!allRequest) createError(404,'there is no maintenance request')
        
        return res.status(200).json(allRequest);
    } catch (error) {
        createError(500,'server error')
    }
}