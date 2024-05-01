import mongoose, { Schema } from "mongoose";
import ContractSchema from "./commons/Contract.js";

const historySchema = mongoose.Schema({
   tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant'
   },
   contract_photo: {
      type: {
         url: String,
         path: String
      }
   },
   from: {
      type: Date,
   },
   upto: {
      type: Date,
      default: Date.now
   }
});
export default historySchema