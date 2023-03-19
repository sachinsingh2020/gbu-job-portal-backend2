import mongoose from "mongoose";

const nationalConference = new mongoose.Schema({
    nameOfConference: {
        type: String,
        required: [true, "Please enter name of conference"],
    },
    whenAndWhere:{
        type: String,
        required: [true, "Please enter when and where"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const interNationalConference = new mongoose.Schema({
    nameOfConference: {
        type: String,
        required: [true, "Please enter name of conference"],
    },
    whenAndWhere:{
        type: String,
        required: [true, "Please enter when and where"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


export const NationalConference = mongoose.model("NationalConference", nationalConference);
export const InterNationalConference = mongoose.model("InterNationalConference", interNationalConference);