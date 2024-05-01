import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
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
    phone:{
          type:String,
    },
   
    role:{
        type:String,
        default:"user"
    },
    tenant: {
        type: Schema.Types.ObjectId,
        ref: 'Tenant'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner'
    }

})
export default mongoose.model("User",userSchema)