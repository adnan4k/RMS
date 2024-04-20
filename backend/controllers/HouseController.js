import House from "../models/House.js"
import { createError } from "../utils/CreateError.js";

export const addHouse = async(req,res,next) =>{
    try {
        const newHouse = new House(req.body);
         const savedHouse = await newHouse.save();
         if(!savedHouse) return createError(500,'error while creating')
        
         return res.status(201).json(savedHouse)

    } catch (error) {
        next(error)
    }
}


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
export const getHouse = async (req, res, next) => {
    const id = req.params.id;
    try {
        const house = await House.findById(id);
        if(!house){
            createError(404,'house not found')
        }

       return res.status(200).json(house);
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
