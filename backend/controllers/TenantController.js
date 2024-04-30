import Tenant from "../models/Tenant.js"
import { createError } from "../utils/CreateError.js";

export const addTenant = async(req,res,next) =>{
    try {
        const newTenant = new Tenant(req.body);
         const savedTenant = await newTenant.save();
         if(!savedTenant) return createError(500,'error while creating')
        
         return res.status(201).json(savedTenant)

    } catch (error) {
        next(error)
    }
}


export const editTenant = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedTenant = await Tenant.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTenant) {
            return next(createError(500, 'Error while updating'));
        }

        return res.status(200).json(updatedTenant);
    } catch (error) {
        return next(error);
    }
};
export const deleteTenant = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedTenant = await Tenant.findByIdAndDelete(id);

       return res.status(200).json({message:"successfully deleted"});
    } catch (error) {
        return next(error);
    }
};
export const getTenant = async (req, res, next) => {
    const id = req.params.id;
    try {
        const tenant = await Tenant.findById(id);
        if(!tenant){
            createError(404,'Tenant not found')
        }

       return res.status(200).json(tenant);
    } catch (error) {
        return next(error);
    }
};
export const getTenants = async (req, res, next) => {
    try {
        const tenants = await Tenant.find();
        if(!tenants){
            createError(404,'Tenant not found')
        }

       return res.status(200).json(tenants);
    } catch (error) {
        return next(error);
    }
};
