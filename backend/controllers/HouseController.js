import { populate } from "dotenv";
import House from "../models/House.js"
import { createError } from "../utils/CreateError.js";

export const createHouse = async (req, res, next) => {
    try {    
        const owner = req.user;
        let {
            no_of_rooms, 
            no_of_bath_rooms,
            width,
            length,
            house_type,
            bankaccounts,
            address,
            rent_amount,
            description
        } = req.body;

        address = JSON.parse(address);
        bankaccounts = JSON.parse(bankaccounts);
        
        const images = req.files.map(file => ({url: 'uploads/'+file.filename, path: file.destination}));
        
        const newHouse = await House.create({
            owner,
            no_of_rooms,
            no_of_bath_rooms,
            width,
            length,
            images,
            house_type,
            bankaccounts,
            rent_amount,
            description,
            address
        });

        return res.status(200).json({msg: "Successfully Created", data: newHouse});
    } catch(error) {
        next(error)
    } 
}

export const getHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const house = await House.findById(id);
        if(!house){
            createError(404,'house not found')
        }

        await house.populate({
            path: 'owner', 
            foreignField: 'user',
            select: '-national_id ',
            populate: {
                path: 'user',
                select: '-role -password -isActive'
            }
        });
        
        return res.status(200).json(house);
    } catch (error) {
        return next(error);
    }
};

export const editHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedHouse = await House.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedHouse) {
            return next(createError(500, 'Error while updating'));
        }

        return res.status(200).json(updatedHouse);
    } catch (error) {
        return next(error);
    }
};
export const deleteHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedHouse = await House.findByIdAndDelete(id);

       return res.status(200).json({message:"successfully deleted"});
    } catch (error) {
        return next(error);
    }
};
export const getHouses = async (req, res, next) => {
    try {
        const houses = await House.find();
        if(!houses){
            createError(404,'house not found')
        }

       return res.status(200).json(houses);
    } catch (error) {
        return next(error);
    }
};
