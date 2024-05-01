import mongoose from "mongoose";
import addressSchema from "./commons/Address.js";
import BankAccountSchema from "./commons/BankAccount.js";
import ContractSchema from "./commons/Contract.js";
import requestSchema from "./VisitorRequest.js";
import historySchema from "./History.js";

export const HouseTypes = [
    'villa',
    'Building',
    'L-shape',
    'Small'
]

// export const Address =  mongoose.model("Address",addressSchema)

// const houseGroupSchema = mongoose.model({
//     name:{type:String},
//     organization:{type:String}
// })

export const houseSchema = mongoose.Schema({
    name: String,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Owner'
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
    occupancy_history: [historySchema]
})

export default mongoose.model("House",houseSchema)