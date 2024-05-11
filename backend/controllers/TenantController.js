import mongoose from "mongoose";
import House from "../models/House.js";
import Tenant from "../models/Tenant.js"
import User from "../models/User.js";
import { createError } from "../utils/CreateError.js";
import sendEmail from "../utils/email.js";
import {refresh} from '../utils/generateTokens.js'
import { removeImage } from "../utils/fileProcessing.js";
import Token from "../models/Tokens.js"

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
        const tenant = await Tenant.create({ user, reference, national_id }, {session});
        const house = await House.findById(houseId);
        
        if (!house)
            throw createError(400, "House not found!");
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
        
        const token = refresh({id: user._id}, '60m' );
        await sendEmail(user.email, token);

        await session.commitTransaction();
        return res.status(200).json({msg: 'Successfully added tenant', data: tenant})
    } catch (error) {
        await session.abortTransaction();

        await removeImage(req.files['national_id'][0].destination);
        await removeImage(req.files['contract_photo'][0].destination);
        next(error);
    } finally {
        await session.endSession();
    }
};

export const editTenant = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let { firstname, lastname, email, phonenumber, username, mother_name, reference } = req.body;
        
        if (reference)
            reference = JSON.parse(reference);
        const user = await User.findOne({_id: req.user, isActive: true}).select('-password -isActive -role');
        
        if (!user)
            throw createError(400, "User not found")

        const tenant = await Tenant.findOne({user: user._id});
        user.firstname = firstname || user.firstname; 
        user.lastname = lastname || user.lastname; 
        user.email = email || user.email; 
        user.phonenumber = phonenumber || user.phonenumber;
        user.username = username || user.username;
        
        tenant.reference = reference || tenant.reference;
        tenant.mother_name = mother_name || tenant.mother_name;

        if (req.file) {
            await removeImage(tenant.national_id.path);
            tenant.national_id = {
                url: "uploads/"+req.file.filename,
                path: req.file.destination
            }
        }
        
        await user.save().session(session);
        await tenant.save().session(session);
    
        await session.commitTransaction();
        return res.status(200).json({msg: "Succssesfully updated!", data: {tenant, user}})
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        await session.endSession();
    }
};

export const getTenant = async (req, res, next) => {
    try {
        const teantid = req.role === 'tenant'? req.user: req.params.username
        const user = User.findOne({$or: [{username: teantid, isActive: true}, {_id: teantid, isActive:true}]});
        if (!user)
            throw createError(400, 'Owner not found')
        if (req.role === 'owner') {
            const house = await House.findOne({owner: req.user, tenant: user._id});
            if (!house)
                throw createError(400, 'Not allowed to see this tenant')
        }
        const tenant = await Tenant.findOne({user: user._id});
        if (!tenant)
            throw createError(400, 'Not an tenant')
        return res.status(200).json({tenant, user});
    } catch (error) {
        return next(error);
    }
};

export const deleteTenant = async (req, res, next) => {
    try {
        const house = await House.findOne({_id: req.params.houseid, owner: req.user});
        if (!house)
            throw createError(400, 'House not found!!');
        
        let tenant = house.tenant;
        if (!tenant)
            throw createError(400, "This house doesn't have a tenant!!");

        
        house.tenant = null;
        house.contract = null;
        house.deadline = null;
        
        const history = {
            tenant,
            from: house.contract.startdate,
            contract_photo: house.contract.photo
        }
        house.occupancy_history.push(history);
        
        await Token.deleteMany({user: tenant});
        // May send an email to the tenant
        await User.findAndUpdateOne({_id: tenant}, {$set: {
            email: {$concat: ['$email', ' ', Date.now()]},
            phonenumber: {$concat: ['$phone', ' ', Date.now()]},
            username: null,
            isActive: false
        }});
        await house.save();
        return res.status(200).json({message:"successfully deleted"});
    } catch (error) {
        next(error);
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
