import mongoose, { Schema } from "mongoose";

const historySchema = new mongoose.Schema({
   tenant: {
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