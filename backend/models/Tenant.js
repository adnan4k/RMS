import mongoose from "mongoose";
import addressSchema from "./commons/Address.js";

export const tenantSchema = new mongoose.Schema({
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
      phonenumber:{
        type: String,
        required: [true, "Reference phone number is required"],
        unique: true,
        validate: {
            validator: phone => {
                const checker = /^\+(2519|2517)\d{8}$/;
                return checker.test(phone);
            },
            message: 'Phone number format doesn\'t match'
        }
    },
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

tenantSchema.set('toJSON', {transform: (doc, ret, options) => {
  ret.national_id = ret.national_id.url;
  return ret
}});

tenantSchema.pre('deleteMany', {document: true, query: false}, async function(query) {
  console.log('In delete many tenant')
  console.log('document', this)
  console.log('query', query)
})

export default mongoose.model("Tenant", tenantSchema);
