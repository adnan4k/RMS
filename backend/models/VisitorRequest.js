import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
        required: true
    },
    date:{
        type: Date,
    }
});

const Requests = mongoose.model('Request', requestSchema);
export default Requests;