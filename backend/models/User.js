import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emial:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    role:{
        type:String,
        required:true
    },
   
})
export default mongoose.model("User",userSchema)