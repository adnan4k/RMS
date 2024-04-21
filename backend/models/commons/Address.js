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
     required:true
    },
    latitude:{
     type:Number,
     required:true
    },
    longitude:{
     type:Number,
     required:true
    }
});

export default addressSchema;
 