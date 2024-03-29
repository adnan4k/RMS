import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
   city:{
    type:String,
    required:true
   },
   kebele:{
    type:String,
    required:true
   },
   sub_city:{
    type:String,
    required:true
   },
   woreda:{
    type:String,
    required:true
   },
   latitude:{
    type:INT,
    required:true
   },
   longitude:{
    type:INT,
    required:true
   }
})

export const Address =  mongoose.model("Address",addressSchema)

const houseGroupSchema = mongoose.model({
    name:{type:String},
    organization:{type:String}
})
const houseSchema = mongoose.Schema({
    owner:{
        type:String,
        required:true
    },
      tenant:{
        type:String,
        required:true
    },
    no_of_rooms:{
        type:INT,
        required:true
    },
    no_of_bath_rooms:{
        type:INT,
        required:true
    },
    width:{
        type:INT,
    },
    length:{
        type:INT,
    },
    house_group:{
        type:houseGroupSchema
    },
    house_type:{
        type:String
    },
   
    address:{
       type:addressSchema
    },
    rent_amount:{
        type:INT
    },
    images:{
        type:[String]
    },
    description:{
        type:String
    },
    visitor_requests:{
        type:String
    }
   

})
export default mongoose.model("House",houseSchema)