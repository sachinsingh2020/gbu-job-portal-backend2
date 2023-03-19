import mongoose from "mongoose";

const schema = new mongoose.Schema({
    postApplied: {
        type: String,
        required: [true, "Please choose post applied"],
    },
    department: {
        type: String,
        required: [true, "Please choose department"],
    },
    school: {
        type: String,
        required: [true, "Please choose school"],
    },
    specialization: {
        type: String,
        required: [true, "Please choose specialization"],
    },
    advertisement: {
        type: String,
        required: [true, "Please choose advertisement"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const AppliedFor = mongoose.model('AppliedFor', schema);