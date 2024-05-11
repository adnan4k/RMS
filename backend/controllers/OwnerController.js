import Owner from "../models/Owner.js";
import User from "../models/User.js";
import { createError } from "../utils/CreateError.js";
import User from "../models/User.js";
import { removeImage } from "../utils/fileProcessing.js";
import mongoose from "mongoose";
import House from "../models/House.js";
import { generateToken } from "../utils/generateTokens.js";


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
                url: "nationalids/"+req.file.filename,
                path: req.file.destination
            }
        });
        
        const savedOwner = await newOwner.save();
        const { accesstoken, refreshtoken } = generateToken(savedOwner);
        return res.status(201).json({accesstoken, refreshtoken, savedOwner});
    } catch (error) {
        next(error);
    }
};

export const getOwner = async (req, res, next) => {
    try {
        const user = User.findOne({$or: [{username: req.params.username}, {_id: req.params.username}]});
        if (!user)
            throw createError(400, 'Owner not found')
        const owner = await Owner.findOne({user: user._id});
        if (!owner)
            throw createError(400, 'Not an owner')
        return res.status(200).json({owner, user});
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
                url: "nationalids/"+req.file.filename,
                path: req.file.destination
            }
        }
        await user.save().session(session);
        await owner.save().session(session);
        await session.commitTransaction();
        return res.status(200).json({msg: "Succssesfully updated!", data: {owner, user}})
    } catch (error) {
        await session.abortTransaction();
        next(error)
    } finally {
        await session.endSession();
    }
}

export const deleteOwner = async(req,res,next) =>{
    const ownerId  = req.user;
    try {
        const session = await mongoose.startSession();
        session.startTransaction()
        const owner = await Owner.findById(ownerId);


        const houses = await House.find({owner:ownerId});
        houses.forEach(async (house) => {
            await house.deleteOne().session(session);
        });
        await Owner.findOneAndDelete({user: ownerId}).session(session);
        await User.findByIdAndDelete(owner.user).session(session)

        await session.commitTransaction();
        await session.endSession();
        
        return res.status(200).json({msg: 'Successfully Deleted This owner'});

    } catch (error) {
        await session.abortTransaction()
        await session.endSession();
        next(error)
    }
}