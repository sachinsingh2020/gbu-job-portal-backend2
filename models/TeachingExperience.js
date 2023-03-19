import mongoose from "mongoose";

const schema = new mongoose.Schema({
    positionHeld:{
        type: String,
        required: [true, "Please enter Position Held"],
    },
    organizationInstitute:{
        type: String,
        required: [true, "Please enter Organization/Institute"],
    },
    dateOfJoining:{
        type: Date,
        required: [true, "Please enter Date of Joining"],
    },
    dateOfLeaving:{
        type: Date,
        required: [true, "Please enter Date of Leaving"],
    },
    totalPeriodDuration:{
        type: Number,
        required: [true, "Please enter Total Period Duration"],
    },
    natureOfDuties:{
        type: String,
        required: [true, "Please enter Nature of Duties"],
    },
    courseTaught:{
        type: String,
        required: [true, "Please enter Course Taught"],
    },
    levelUgPg:{
        type: String,
        required: [true, "Please enter Level (UG/PG)"],
    },
    lastPay:{
        type: Number,
        required: [true, "Please enter Last Pay"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const TeachingExperience = mongoose.model('TeachingExperience', schema);

