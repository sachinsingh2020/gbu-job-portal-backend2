import mongoose from "mongoose";

const schema = new mongoose.Schema({
    phdThesisTitle: {
        type: String,
        required: [true, "Please enter PhD Thesis Title"],
    },
    researchAreaThesisWork: {
        type: String,
        required: [true, "Please enter Research Area of Thesis Work"],
    },
    dateOfJoining: {
        type: Date,
        required: [true, "Please enter Date of Joining"],
    },
    dateOfSubmission: {
        type: Date,
        required: [true, "Please enter Date of Submission"],
    },
    dateOfCompletion: {
        type: Date,
        required: [true, "Please enter Date of Completion"],
    },
    nameOfThesisSupervisor: {
        type: String,
        required: [true, "Please enter Name of Thesis Supervisor"],
    },
    partTimeFullTime: {
        type: String,
        required: [true, "Please enter Part Time/Full Time"],
    },
    institutionUniversity: {
        type: String,
        required: [true, "Please enter Institution/University"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const PhdDetails = mongoose.model('PhdDetails', schema);
