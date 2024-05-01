import mongoose from "mongoose";

const maintenanceSchema = mongoose.Schema({
    tenant_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'tenant'
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
        default: false,
    },
    date_of_request:{
        type:Date,
        required:true,
        default: Date.now
    },
    house_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'House'
    }
})
export default mongoose.model("Maintenance",maintenanceSchema)