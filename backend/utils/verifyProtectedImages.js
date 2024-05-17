import mongoose from "mongoose";
import House from "../models/House.js";
import Owner from "../models/Owner.js";
import Tenant from "../models/Tenant.js";
import { createError } from "./CreateError.js";

export const verifyContract = async (req, res, next) => {
    try {
        req.originalUrl = req.originalUrl.slice(1)
        if (req.role === 'tenant') {
            const house = await House.findOne({tenant: req.user, 'contract.photo.url': req.originalUrl});
            
            if (!house)
                throw createError(400, 'Contract photo not found!');
    
            next()
            return
        }
    
        if (req.role === 'owner') {
            const house = await House.findOne({$or: [
                {'contract.photo.url': req.originalUrl, owner: req.user}, 
                { owner: req.user, 'occupancy_history.contract_photo.url': req.originalUrl}]});
    
            if (!house)
                throw createError(400, 'Contract photo not found!')
            
            next()
            return
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const verifyNationalId = async (req, res, next) => {
    try {
        req.originalUrl = req.originalUrl.slice(1)
        if (req.role === 'tenant') {
            const house = await House.findOne({tenant: req.user})
            
            if (!house)
                throw createError(400, 'Contract photo not found!');
    
            const tenant = await Tenant.findOne({user: req.user, 'national_id.url': req.originalUrl});
            if (tenant) {
                next()
                return
            }
            const owner = await Owner.findOne({user: req.user, 'national_id.url': req.originalUrl})
            if (owner) {
                next()
                return
            }
            throw createError(400, "National id image not found")
        }
    
        if (req.role === 'owner') {
            req.user = new mongoose.Types.ObjectId(req.user);

            const owner = await Owner.findOne({
                'national_id.url': req.originalUrl, user: req.user, 
                user: req.user,
            });
            if (owner) {
                next()
                return
            }
            
            let tenants = await House.aggregate([
                {$match: {owner: req.user}}, 
                {$project: {owner: 1,tenant: ['$tenant'], "tenants": '$occupancy_history.tenant',}}, 
                {$project: {all: {$concatArrays: ['$tenant', '$tenants']},owner:1}}, 
                {$unwind: '$all'},
                {$group: {_id:'$owner', tenants:{$push: '$all'}}}
            ]);
            
            tenants = tenants[0].tenants;
            const tenant = await Tenant.findOne({user: {$in: tenants}, 'national_id.url': req.originalUrl});
            if (tenant) {
                next()
                return
            }

            throw createError(400, 'Contract photo not found!')
        }
        next()
    } catch (error) {
        next(error)
    }
}
