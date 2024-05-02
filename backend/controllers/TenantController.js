import House from "../models/House.js";
import Tenant from "../models/Tenant.js"
import User from "../models/User.js";
import { createError } from "../utils/CreateError.js";
import sendEmail from "../utils/email.js";


export const addTenant = async(req, res, next) => {
    try {
        let { email, firstname, lastname, phonenumber, reference, houseId } = req.body;
        sendEmail('imran.mohammed@gmail.com');
        reference = JSON.parse(reference);
        const national_id = {
            url: 'uploads/'+req.file.filename,
            path: req.file.destination
        }
        
        const user = await User.create({ email, firstname, lastname, phonenumber, password: 'password', isActive: false});
        const tenant = await Tenant.create({ user, reference, national_id });
        const house = await House.findById(houseId);
        house.tenant = user;
        sendEmail(user.email);
        await house.save();
        return res.status(200).json({msg: 'Successfully registre', data: tenant})
    } catch (error) {
        next(error);
    }
};



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
