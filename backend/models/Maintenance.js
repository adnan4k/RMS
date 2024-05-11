import mongoose from "mongoose";

const maintenanceSchema = mongoose.Schema({
    tenant_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Tenant'
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
    house_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'House'
    }
}, {
    timestamps: true,
})
export default mongoose.model("Maintenance",maintenanceSchema)