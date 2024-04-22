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
        required: true,
        validate: {
            validator: phone => {
                const checker = /\+(2519|2517)\d{8}/;
                return checker.test(phone);
            },
            message: 'Phone number format doesn\'t match'
        }
    },
    email:{
        type:String,
        required:true,
        validate: {
            validator: email => {
                const checker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return checker.test(email);
            },
            message: 'Phone number format doesn\'t match'
        }

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
    isActive: {
        type: Boolean,
        default: true,
    }
})
export default mongoose.model("User",userSchema)