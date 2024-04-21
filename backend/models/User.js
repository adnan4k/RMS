import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phonenumber:{
        type: String,
        required: true
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
        default:"user",
        enum: ['visitor', 'admin', 'owner', 'tenant']
    },
})
export default mongoose.model("User",userSchema)