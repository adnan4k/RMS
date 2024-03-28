import mongoose from "mongoose";

const maintenanceSchema = mongoose.Schema({
    tenant_id:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date_of_request:{
        type:Date,
        required:true
    },
    house_id:{
        type:String,
        required:true
    }

})
export default mongoose.model("Maintenance",maintenanceSchema)