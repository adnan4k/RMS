import mongoose, { Schema } from "mongoose";

const historySchema = mongoose.Schema({
   house_id:{
    type:Schema.Types.ObjectId,
    ref:"House"
   },
   tenant_id:{
    type:Schema.Types.ObjectId,
    ref:"Tenant"
   },
   contract:{
    type:Schema.Types.ObjectId,
    ref:"Contract"
   },

})
export default mongoose.model("History", historySchema)