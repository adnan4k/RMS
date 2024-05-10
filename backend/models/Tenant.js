import mongoose from "mongoose";
import addressSchema from "./commons/Address.js";

export const tenantSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  mother_name: {
    type: String,
  },
  reference: {
    type: {
      name: String,
      phone: String,
      address: addressSchema
    },
    required: true
  },
  national_id: {
    type: {
      url: String,
      path: String,
    },
    required: true,
  },
});
export default mongoose.model("Tenant", tenantSchema);
