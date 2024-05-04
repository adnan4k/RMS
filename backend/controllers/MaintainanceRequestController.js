import House from "../models/House.js";
import Maintenance from "../models/Maintenance.js";
import { createError } from "../utils/CreateError.js";


export const createMaintainance = async(req,res,next)=>{
    const {houseId,tenantId,description,dateOfRequest} = req.body;
     try {
        const maintainace = new Maintenance({
            house_id:houseId,
            tenant_id:tenantId,
            description:description,
            date_of_request:dateOfRequest
        })
          
        const savedMaintainance = await maintainace.save();
        if(!savedMaintainance)
            createError(500,'something went wrong while saving');

        return res.status(201).json(savedMaintainance)
     } catch (error) {
        createError(500,"internal server error")
     }
}

export const getMaintenanceRequest = async(req,res,next) =>{
        const {ownerId} = req.params.id;
        try {
            const houses = await House.find({owner:ownerId});
                if(!houses) createError(404,"houses with this owner are not found")
            const houseIds = houses.map(house => house._id);
        
            const maintenanceRequests = await Maintenance.find({house_id:houseIds})
                if(!maintenanceRequests) createError(404,'no maintenance requests')
            
            res.status(200).json(maintenanceRequests)
        } catch (error) {
        createError(500,'internal server error');
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