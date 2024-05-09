import mongoose, { startSession } from "mongoose";
import House from "../models/House.js";
import Tenant from "../models/Tenant.js"
import User from "../models/User.js";
import { createError } from "../utils/CreateError.js";
import sendEmail from "../utils/email.js";
import jwt from 'jsonwebtoken';
import { removeImage } from "../utils/fileProcessing.js";

export const addTenant = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let { email, firstname, lastname, phonenumber, reference } = req.body;
        const houseId = req.params.houseid
        reference = JSON.parse(reference);

        let national_id = req.files['national_id'][0]
        let contract_photo = req.files['contract_photo'][0]
        
        national_id = {
            url: 'uploads/'+national_id.filename,
            path: national_id.destination
        }
        contract_photo = {
            url: 'uploads/'+contract_photo.filename,
            path: contract_photo.destination
        }
        
        let user =  await User.findOne({email: email});
        if (user && user.role != 'user')
            throw createError(400, 'This email has been taken!!');
        if (!user)
            user = await User.create({ role: 'tenant', email, firstname, lastname, phonenumber, password: 'password', isActive: false}, {session});
        const tenant = await Tenant.create({ user, reference, national_id });
        const house = await House.findById(houseId);
        
        const today = new Date();

        house.tenant = user;
        house.contract = {
            startdate: today,
            photo: contract_photo,
        }

        const onemonth = new Date(today);
        onemonth.setMonth(today.getMonth()+1);
        onemonth.setDate(today.getDate()+1);
        onemonth.setHours(0,0,0,0);

        house.deadline = onemonth; 
        await house.save();
        
        const token = jwt.sign({id: user._id}, "secret_key", { expiresIn: '60m' });
        await sendEmail(user.email, token);

        await session.commitTransaction();
        return res.status(200).json({msg: 'Successfully added tenant', data: tenant})
    } catch (error) {
        await session.abortTransaction();
// TODO: Multilevel try catch blocks here

        await removeImage(req.files['national_id'][0].destination);
        await removeImage(req.files['contract_photo'][0].destination);
        next(error);
    } finally {
        await session.endSession();
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
