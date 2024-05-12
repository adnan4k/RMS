import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique: true,
        sparse: true,
        lowercase: true
    },
    lastname:{
        type:String,
        required:true
    },
    phonenumber:{
        type: String,
        required: true,
        unique: true,
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
        unique: true,
        validate: {
            validator: email => {
                const checker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return checker.test(email);
            },
            message: 'Incorrect email format!'
        },
        lowercase: true
    },
    password:{
        type:String,
        minlength: 6,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum: ['user', 'admin', 'owner', 'tenant']
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

userSchema.pre('save', function (next) {
    const random = Math.floor(Math.random() * 10000);
    if (!this.username)
        this.username = this.email.split('@')[0] + random
    next()
});

const User = mongoose.model("User",userSchema);
export default User;