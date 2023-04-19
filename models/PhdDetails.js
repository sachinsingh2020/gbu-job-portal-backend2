import mongoose from "mongoose";

const schema = new mongoose.Schema({
    phdThesisTitle: {
        type: String,
    },
    researchAreaThesisWork: {
        type: String,
    },
    dateOfJoining: {
        type: Date,
    },
    dateOfSubmission: {
        type: Date,
    },
    dateOfCompletion: {
        type: Date,
    },
    nameOfThesisSupervisor: {
        type: String,
    },
    partTimeFullTime: {
        type: String,
    },
    institutionUniversity: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const PhdDetails = mongoose.model('PhdDetails', schema);
