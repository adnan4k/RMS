import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique: true,
        sparse: true
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
        },
        unique: true
    },
    email:{
        type:String,
        required:true,
        validate: {
            validator: email => {
                const checker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return checker.test(email);
            },
            message: 'Incorrect email format!'
        },
        unique: true
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
})
userSchema.pre('save', function (next) {
    console.log(this);
    const random = Math.floor(Math.random() * 10000);
    if (!this.username)
        this.username = this.email.split('@')[0] + random
    next()
});
export default mongoose.model("User",userSchema)