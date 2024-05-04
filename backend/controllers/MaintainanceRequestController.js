import Maintenance from "../models/Maintenance.js";
import { createError } from "../utils/CreateError";


export const createMaintainance = async(req,res,next)=>{
    const {houseId,tenantId,description,status,dateOfRequest} = req.body;
     try {
        const maintainace = new Maintenance({
            house_id:houseId,
            tenant_id:tenantId,
            description:description,
            status:status,
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