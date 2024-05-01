import Owner from "../models/Owner";
import User from "../models/User";



export const addOwner = async(req, res, next) => {
    try {
        // Create a new user with the specified role
        const newUser = new User({
            username: req.body.username, 
            role: req.body.role
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        if (!savedUser) {
            return createError(500, 'Error while creating user');
        }

        const newOwner = new Owner({
            ...req.body,
            owner: savedUser._id 
        });

        const savedOwner = await newOwner.save();

        if (!savedOwner) {
            await User.findByIdAndDelete(savedUser._id);
            return createError(500, 'Error while creating Owner');
        }

        return res.status(201).json(savedOwner);
    } catch (error) {
        next(error);
    }
};
