import mongoose from "mongoose";

const schema = new mongoose.Schema({
    acceptSalary:{
        type: String,
        required: [true, "Please choose yes or no"],
    },
    mentionPeriod:{
        type: Number,
        required: [true, "Please mention period needed for joining if offered a post"],
    },
    acceptPosition:{
        type: String,
        required: [true, "Please choose yes or no"],
    },
    medicallyUnfit:{
        type: String,
        required: [true, "Please choose yes or no"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const General = mongoose.model('General', schema);
