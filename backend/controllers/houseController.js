import House from "../models/House";

export const createHouse = async (req, res, next) => {
    try {    
        const user = req.user || 'sampleid';
        const {
            no_of_rooms, 
            no_bath_rooms,
            width,
            length,
            house_type,
            bankaccounts,
            rent_amount,
            description
        } = req.body;

        const images = req.files;
        console.log(images);
        // const newHouse = await House.create({
        //     owner: user,
        //     no_of_rooms:no_of_rooms||null,
        //     no_bath_rooms:no_bath_rooms||null,
        //     width:width||null,
        //     length:length||null,
        //     house_type:house_type||null,
        //     bankaccounts:bankaccounts||[],
        //     rent_amount:rent_amount||null,
        //     description: description||null,
        // });

        return res.status(200).json({msg: "Successfully Created"});

    } catch(error) {
        next(error)
    } 
}