import mongoose from "mongoose";

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
        type:String
    },
    house_type:{
        type:String
    },
   
    address:{
        kebele:{
            type:String
        }
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