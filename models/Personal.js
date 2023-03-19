import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter First Name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter Last Name"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Please enter Date of Birth"],
    },
    gender: {
        type: String,
        required: [true, "Please enter your Gender"],
    },
    maritalStatus: {
        type: String,
        required: [true, "Please enter your Marital Status"],
    },
    nationality: {
        type: String,
        required: [true, "Please enter your Nationality"],
    },
    category: {
        type: String,
        required: [true, "Please enter your Category"],
    },
    emailAddress: {
        type: String,
        required: [true, "Please enter your Email Address"],
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please enter your Phone Number"],
    },
    alternativePhoneNumber: {
        type: Number,
        required: [true, "Please enter your Alternative Phone Number"],
    },
    fatherHusbandName: {
        type: String,
        required: [true, "Please enter your Father/Husband Name"],
    },
    permanentAddress: {
        type: String,
        required: [true, "Please enter your Permanent Address"],
    },
    profilePic: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    aadharNumber: {
        type: Number,
        required: [true, "Please enter your Aadhar Number"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Personal = mongoose.model("Personal", schema);