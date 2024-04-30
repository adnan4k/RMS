import mongoose from "mongoose";
const addressSchema = mongoose.Schema({
   city: {
    type: String,
    required: true
   },
   kebele: {
    type: String,
    required: true
   },
   sub_city: {
    type: String,
    required: true
   },
   woreda: {
    type: String,
    required: true
   },
   latitude: {
    type: Number,
    required: true
   },
   longitude: {
    type: Number,
    required: true
   }
});

const Address = mongoose.model("Address", addressSchema);

const houseGroupSchema = mongoose.Schema({
    name: { type: String },
    organization: { type: String }
});

const houseSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    tenant: {
        type: String,
        required: true
    },
    no_of_rooms: {
        type: Number,
        required: true
    },
    no_of_bath_rooms: {
        type: Number,
        required: true
    },
    width: {
        type: Number
    },
    length: {
        type: Number
    },
    house_group: {
        type: houseGroupSchema
    },
    house_type: {
        type: String
    },
    address: {
       type: addressSchema
    },
    rent_amount: {
        type: Number
    },
    images: {
        type: [String]
    },
    description: {
        type: String
    },
    visitor_requests: {
        type: String
    }
});


export default mongoose.model("House",houseSchema)