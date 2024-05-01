import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
  mother_name: {
    type: String,
  },
  kebele: {
    type: String,
  },
  reference_name:{
    type:String
  },
  reference_number:{
    type:String
  },
  national_id: {
    type: String,

    required: true,
  },
});
export default mongoose.model("Owner", ownerSchema);
