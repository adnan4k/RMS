import mongoose, { Schema } from "mongoose";
import ContractSchema from "./commons/Contract.js";

const historySchema = mongoose.Schema({
   tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   contract: ContractSchema,
   from: {
      type: Date,
   },
   upto: {
      type: Date,
   },
   timetolive: {
      type: Date,
   }
});
export default historySchema