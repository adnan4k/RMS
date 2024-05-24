import mongoose, { get } from "mongoose";
import addressSchema from "./commons/Address.js";
import BankAccountSchema from "./commons/BankAccount.js";
import ContractSchema from "./commons/Contract.js";
import historySchema from "./History.js";
import Maintenance from "./Maintenance.js";
import Requests from "./VisitorRequest.js";
import { removeImage } from "../utils/fileProcessing.js";
import User from "./User.js";

export const HouseTypes = [
    'villa',
    'building',
    'l-shape',
    'small'
]

function timegetter(date) {
    return new Date(date);
}

export const houseSchema = new mongoose.Schema({
    housenumber: {
        type: Number,
        required: true,
        get: houseno => houseno < 10? '0'+houseno : houseno
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Owner',
    },
    tenant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    },
    no_of_rooms:{
        type:Number,
        required:true
    },
    no_of_bath_rooms:{
        type:Number,
        required:true
    },
    width:{
        type:Number,
    },
    length:{
        type:Number, 
    },
    house_type:{
        type:String,
        enum: HouseTypes,
        lowercase: true
    },
    address:{
        type:addressSchema
    },
    bankaccounts: [BankAccountSchema],
    rent_amount:{
        type:Number
    },
    deadline: {
        type:Date
    },
    images:[{
        url: String,
        path: String,
    }],
    contract: ContractSchema,
    description:{
        type:String
    },
    occupancy_history: [historySchema],
    calendar: {
        type: {
            open: Boolean,
            schedule: {
                type: [{
                    starttime: {
                        type: Date,
                        get: timegetter,
                    },
                    endtime: {
                        type: Date,
                        get: timegetter
                    }
                }],
                required: false
            }
        },
        default: v => {
            console.log('The default is run just when created', v);
            return ({open: false, schedule: Array(7).fill(null)});
        }
    },
})

houseSchema.pre('deleteOne', { document: true, query: false }, async function() {
    await Maintenance.deleteMany({house_id: this._id});
    await Requests.deleteMany({house: this._id});
    
    // Remove tenant and clear history
    const tenants = this.occupancy_history.map(({tenant_id}) => tenant_id);
    if (this.tenant) tenants.push(this.tenant);
    
    await User.deleteMany({_id: {$in: tenants}});
    // Don't forget to delete the National id and Contracts too from history
    // Remove all images of the house
    this.images.forEach(async element => {
        await removeImage(element.path)
    });
});

houseSchema.set('toJSON', {transform: (doc, ret, options) => {
    if (ret.images)
        ret.images = ret.images.map(({url}) => url);
    return ret
}});

houseSchema.index({ housenumber: 1, owner: 1 }, { unique: true });

const House = mongoose.model("House", houseSchema);
export default House 