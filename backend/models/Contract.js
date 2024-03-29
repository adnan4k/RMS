import mongoose from "mongoose";

const contractSchema = mongoose.Schema({
    starting_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    },
    image:{
        type:String,
        required:true
    }

})
export default mongoose.model("Contract",contractSchema)