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
    }
   

})
export default mongoose.model("House",houseSchema)