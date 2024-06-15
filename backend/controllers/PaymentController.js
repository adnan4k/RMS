import House from "../models/House.js";
import Payment from "../models/Payment.js";
import { createError } from "../utils/CreateError.js";

export const payRent = async (req, res, next) => {
    try {
        const house = await House.findOne({tenant: req.user});

        const {paid_to, month} = req.body;
        if (!req.file)
            throw createError(400, 'Verificaiton is needed')
        
        const verification = {
            url: 'verifications/'+req.file.filename,
            path: req.file.destination+"/"+req.file.filename
        };
        
        if (!house)
            throw createError(400, 'House not found');

        const payment = await Payment.create({
            deadline: house.deadline,
            amount: house.rent_amount,
            house_id: house._id,
            tenant_id: req.user,
            paid_to: paid_to,
            month: month || 1,
            verification
        });
        
        return res.status(200).json(payment)
    } catch (error) {
        next(error)
    }
}

export const verifyPayment = async (req, res, next) => {
    try {
        const house = await House.findOne({_id: req.params.houseid, owner: req.user});

        if (!house)
            throw createError(400, 'House not found');

        const payment = await Payment.findOne({_id: req.params.paymentid, house_id: house._id});
        if (!payment)
            throw createError(400, 'Wrong payment id');
        
        if (payment.status)
            return res.status(200).json('Already paid');
        
        payment.status = true;
        
        const old_deadline = new Date(house.deadline);
        old_deadline.setMonth(old_deadline.getMonth()+payment.month);
        house.deadline = old_deadline;
        await payment.save();
        await house.save();
    
        return res.status(200).json('Successfully verified date');
    } catch (error) {
        next(error);
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
