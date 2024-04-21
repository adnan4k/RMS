import mongoose, { Schema } from "mongoose";
import ContractSchema from "./commons/Contract.js";
import { userSchema } from "./User.js";

const historySchema = mongoose.Schema({
   house_id:{
    type:Schema.Types.ObjectId,
   },
   tenant_id: userSchema,
   contract: ContractSchema,
   from: {
      type: Date,
      required: true
   },
   upto: {
      type: Date,
      required: true
   },
   timetolive: {
      type: Date,
   }
})
export default mongoose.model("History", historySchema)