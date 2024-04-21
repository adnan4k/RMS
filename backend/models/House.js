import mongoose from "mongoose";
import addressSchema from "./commons/Address.js";
import BankAccountSchema from "./commons/BankAccount.js";
import ContractSchema from "./commons/Contract.js";
import requestSchema from "./VisitorRequest.js";

export const HouseTypes = [
    'Villa',
    'Building',
    'L-shape',
    'Small'
]

// export const Address =  mongoose.model("Address",addressSchema)

// const houseGroupSchema = mongoose.model({
//     name:{type:String},
//     organization:{type:String}
// })

const houseSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    tenant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    bankaccount: [BankAccountSchema],
    rent_amount:{
        type:Number
    },
    images:[{
        url: String,
        path: String,
    }],
    contract: ContractSchema,
    description:{
        type:String
    },
    visitor_requests:[requestSchema]
})

export default mongoose.model("House",houseSchema)