import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
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
    national_id:{
        type:String,
        required:true
    }

})
export default mongoose.model("Owner",ownerSchema)