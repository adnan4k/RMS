import House from "../models/House.js";

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
        console.log(bankaccounts);
        const images = req.files.map(file => ({url: 'uploads/'+file.filename, path: file.destination}));
        console.log(no_of_bath_rooms)
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