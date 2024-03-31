import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    role:{
        type:String,
        default:"user"
    },
   
})
export default mongoose.model("User",userSchema)