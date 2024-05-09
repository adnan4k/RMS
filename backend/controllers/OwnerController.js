import Owner from "../models/Owner.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import { createError } from "../utils/CreateError.js";
import User from "../models/User.js";
import { removeImage } from "../utils/fileProcessing.js";
import mongoose from "mongoose";


export const addOwner = async(req, res, next) => {
    try {
        let { address } = req.body;
        address = JSON.parse(address);
        
        const user = await User.findById(req.user);

        if (!user) 
            throw createError(400, "User not found");
        
        user.role = 'owner';
        await user.save();
        const newOwner = new Owner({
            address,
            user,
            national_id : {
                url: "uploads/"+req.file.filename,
                path: req.file.destination
            }
        });
        
        const savedOwner = await newOwner.save();
        const token = jwt.sign(
            { id: user._id, role: user.role },
            "secret_key"
          );
        return res.status(201).cookie("access_token", token, { httponly: true }).json(savedOwner);
    } catch (error) {
        next(error);
    }
};

export const getOwner = async (req, res, next) => {
    try {
        const owner = Owner({user: req.user}).populate({
            path: 'user',
            select: '-role -password -isActive'
        });
        return res.status(200).json(owner);
    } catch (error) {
        next(error)
    }
}

export const editProfile = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let { firstname, lastname, email, phonenumber, username, address, national_id } = req.body;
        if (address)
            address = JSON.parse(address)
        const user = await User.findById(req.user);
        const owner = await Owner.findOne({user: req.user});
        user.firstname = firstname || user.firstname; 
        user.lastname = lastname || user.lastname; 
        user.email = email || user.email; 
        user.phonenumber = phonenumber || user.phonenumber;
        owner.address = address || user.address;
         
        if (req.file) {
            await removeImage(owner.national_id.path);
            owner.national_id = {
                url: "uploads/"+req.file.filename,
                path: req.file.destination
            }
        }
        await owner.save().session(session);
        await user.save().session(session);
        await session.commitTransaction();
        return res.status(200).json({msg: "Succssesfully updated!", data: {owner, user}})
    } catch (error) {
        await session.abortTransaction();
        next(error)
    } finally {
        await session.endSession();
    }
}
