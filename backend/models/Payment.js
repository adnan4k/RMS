import mongoose from "mongoose";
import BankAccount from './commons/BankAccount.js';

const paymentSchema = new mongoose.Schema({
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
    },
    status: {
        type: Boolean,
        default: false
    },
    verification: {
        type: {
            url: String,
            path: String,
        },
        required: true,
    },
    month: {
        type: Number,
        default: 1
    }
})
export default mongoose.model("Payment",paymentSchema)