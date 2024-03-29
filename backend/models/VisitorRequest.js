import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
  
    emial:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

})
export default mongoose.model("Request",requestSchema)