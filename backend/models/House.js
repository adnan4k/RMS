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
    'Building',
    'L-shape',
    'Small'
]

function timegetter(date) {
    return new Date(date);
}

export const houseSchema = new mongoose.Schema({
    name: String,
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
        enum: HouseTypes
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
            }
        },
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

const House = mongoose.model("House", houseSchema);
export default House 