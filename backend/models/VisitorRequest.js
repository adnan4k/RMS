import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
    }
});

export default requestSchema;