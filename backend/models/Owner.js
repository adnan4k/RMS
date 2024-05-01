import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
    kebele:{
        type:String,
        required:true
    },
    reference_name:{
        type:String,
        required:true
    },
    reference_number:{
        type:String,
        required:true
    },
 
    national_id:{
        type:String,
        required:true
    }

})
export default mongoose.model("Owner",ownerSchema)