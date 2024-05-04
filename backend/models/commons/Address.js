import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    city:{
     type:String,
     required:true
    },
    kebele:{
     type:String,
     required:true
    },
    sub_city:{
     type:String,
     required:true
    },
    woreda:{
     type:String,
    },
    latitude:{
     type:Number,
    },
    longitude:{
     type:Number,
    }
});

export default addressSchema;
 