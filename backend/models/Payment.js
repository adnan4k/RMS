import mongoose from "mongoose";
import BankAccount from './commons/BankAccount.js'
import User from "./User.js";

const paymentSchema = mongoose.Schema({
    date:{
        type:Date,
        required:true,
        default: Date.now
    },
    deadline:{
        type:Date,
        required:true
    },
    amount: {
        type: Number,
        required: true,
    },
    paid_from:{
        type:BankAccount,
        required:true
    },
    paid_to:{
        type:BankAccount,
        required:true
    },
    house_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'House'
    },
    tenant_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    }
})
export default mongoose.model("Payment",paymentSchema)