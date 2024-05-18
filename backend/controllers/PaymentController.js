import House from "../models/House.js";
import Payment from "../models/Payment.js";
import { createError } from "../utils/CreateError.js";

export const payRent = async (req, res, next) => {
    try {
        const house = await House.findOne({tenant: req.user});

        const {paid_from, paid_to} = req.body;

        if (!house)
            throw createError(400, 'House not found');

        const payment = await Payment.create({
            deadline: house.deadline,
            amount: house.rent_amount,
            house_id: house._id,
            tenant_id: req.user,
            paid_from: paid_from,
            paid_to: paid_to 
        });

        const newDeadline = new Date(house.deadline);
        newDeadline.setMonth(newDeadline.getMonth()+1);
        house.deadline = newDeadline;
        
        await house.save();

        return res.status(200).json(payment)
    } catch (error) {
        next(error)
    }
}

export const paymentStats = async (req, res, next) => {
    try {
        let houses = await House.find({owner: req.user}).select('_id');
        houses = houses.map(({_id}) => _id);
        const payments = await Payment.aggregate([
            {$match:{
                house_id: {$in: houses}
            }},
            {$sort: {date: 1}},
            {$lookup: {
                from: 'houses',
                localField: 'house_id',
                foreignField: '_id',
                pipeline: [{
                    $replaceRoot: {newRoot: {
                        houseno: '$housenumber',
                        images: '$images.url',
                    }}
                }],
                as: 'house'
            }},
            {$lookup: {
                from: 'users',
                localField: 'tenant_id',
                foreignField: '_id',
                pipeline: [{
                    $replaceRoot: {newRoot: {
                        tenant: '$_id',
                        firstname: '$firstname',
                        lastname: '$lastname',
                        email: '$email',
                        isActive: '$isActive'
                    }}
                }],
                as: 'tenant'
            }},
            {$unwind: '$house'},
            {$unwind: '$tenant'},
            {$addFields: {
                month: {$dateTrunc: 
                    {
                        date: '$deadline',
                        unit: 'month'
                    }}
            }},
            {$group: {
                _id: '$month',
                total: {$sum: '$amount'},
                details: {$push: {
                    amount: '$amount',
                    house: '$house',
                    tenant: '$tenant',
                    paid_from: '$paid_from',
                    paid_to: '$paid_to',
                    date: '$date',
                    deadline: '$deadline'
                }},
            }},
        ]);
        return res.status(200).json(payments);
    } catch (error) {
        next(error)
    }
}
