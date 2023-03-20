import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please enter your phone number"],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    userData: {
        personal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Personal"
        },
        appliedFor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppliedFor"
        },
        education: {
            graduation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Graduation"
            },
            postGraduation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "PostGraduation"
            },
            mPhil: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MPhil"
            },
            phd: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Phd"
            },
        },
        phdDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PhdDetails"
        },
        teachingExperience:
            [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "TeachingExperience"
                },
            ],
        research: {
            nationalResearch: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "NationalResearch"
                }
            ],
            interNationalResearch: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "InterNationalResearch"
                }
            ]
        },
        conference: {
            nationalConference: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "NationalConference"
                }
            ],
            interNationalConference: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "InterNationalConference"
                }
            ]
        },
        general: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "General"
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: String,

});

schema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
})

schema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    })
}

schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

schema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

export const User = mongoose.model('User', schema);