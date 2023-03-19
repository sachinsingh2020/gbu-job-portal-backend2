import mongoose from "mongoose";

const nationalResearchSchema = new mongoose.Schema({
    nameOfJournel:{
        type: String,
        required: [true, "Please enter name of journel"],
    },
    impactFactor:{
        type: Number,
        required: [true, "Please enter impact factor"],
    },
    noOfPaperPublished:{
        type: Number,
        required: [true, "Please enter no of paper published"],
    },
    broadAreas:{
        type: String,
        required: [true, "Please enter broad areas"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const interNationalResearchSchema = new mongoose.Schema({
    nameOfJournel:{
        type: String,
        required: [true, "Please enter name of journel"],
    },
    impactFactor:{
        type: Number,
        required: [true, "Please enter impact factor"],
    },
    noOfPaperPublished:{
        type: Number,
        required: [true, "Please enter no of paper published"],
    },
    broadAreas:{
        type: String,
        required: [true, "Please enter broad areas"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const NationalResearch = mongoose.model("NationalResearch", nationalResearchSchema);
export const InterNationalResearch = mongoose.model("InterNationalResearch", interNationalResearchSchema);