import mongoose from "mongoose";

const graduationSchema = new mongoose.Schema({
    university: {
        type: String,
    },
    specialization: {
        type: String,
    },
    yearOfPassing: {
        type: Number,
    },
    percentageOfMarks: {
        type: Number,
    },
    classGrade: {
        type: String,
    },
    selfAttestedCopy: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const postGraduationSchema = new mongoose.Schema({
    university: {
        type: String,
    },
    specialization: {
        type: String,
    },
    yearOfPassing: {
        type: Number,
    },
    percentageOfMarks: {
        type: Number,
    },
    classGrade: {
        type: String,
    },
    selfAttestedCopy: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const mPhilSchema = new mongoose.Schema({
    university: {
        type: String,
    },
    specialization: {
        type: String,
    },
    yearOfPassing: {
        type: Number,
    },
    percentageOfMarks: {
        type: Number,
    },
    classGrade: {
        type: String,
    },
    selfAttestedCopy: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const phdSchema = new mongoose.Schema({
    university: {
        type: String,
    },
    specialization: {
        type: String,
    },
    yearOfPassing: {
        type: Number,
    },
    percentageOfMarks: {
        type: Number,
    },
    classGrade: {
        type: String,
    },
    selfAttestedCopy: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Graduation = mongoose.model("Graduation", graduationSchema);
export const PostGraduation = mongoose.model("PostGraduation", postGraduationSchema);
export const MPhil = mongoose.model("MPhil", mPhilSchema);
export const Phd = mongoose.model("Phd", phdSchema);
