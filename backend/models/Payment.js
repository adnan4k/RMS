import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    date:{
        type:DataTime,
        required:true
    },
    deadline:{
        type:DataTime,
        required:true
    },
    paid_from:{
        type:String,
        required:true
    },
    paid_to:{
        type:String,
        required:true
    },
    house_id:{
        type:String,
    },
    tenant_id:{
        type:String,
    }


})