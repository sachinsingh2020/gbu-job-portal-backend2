import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Personal } from "../models/Personal.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import { User } from "../models/User.js";

export const createPersonal = catchAsyncError(async (req, res, next) => {
    let { firstName, lastName, dateOfBirth, gender, maritalStatus, nationality, category, emailAddress, phoneNumber, alternativePhoneNumber, fatherHusbandName, permanentAddress, aadharNumber } = req.body;

    if (!alternativePhoneNumber) {
        alternativePhoneNumber = 0;
    }

    if (!firstName || !lastName || !dateOfBirth || !gender || !maritalStatus || !nationality || !category || !emailAddress || !phoneNumber || !fatherHusbandName || !permanentAddress || !aadharNumber) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    if (phoneNumber.length !== 10) {
        return next(new ErrorHandler("Please enter a valid Phone Number", 400));
    }

    if (aadharNumber.length !== 12) {
        return next(new ErrorHandler("Please enter a valid Aadhar Number", 400));
    }

    const file = req.file;
    if (req.file === undefined) {
        return next(new ErrorHandler("Please upload a profile picture", 400));
    }

    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    const user = await User.findById(req.user._id).populate("userData.personal");

    if (user.userData.personal) {
        await cloudinary.v2.uploader.destroy(user.userData.personal.profilePic.public_id);
        await Personal.deleteOne({ _id: user.userData.personal._id });
    }

    user.userData.personal = await Personal.create({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        maritalStatus,
        nationality,
        category,
        emailAddress,
        phoneNumber,
        alternativePhoneNumber,
        fatherHusbandName,
        permanentAddress,
        aadharNumber,
        profilePic: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    });


    await user.save();
    res.status(201).json({
        success: true,
        user,
        message: "Personal Details Saved Successfully",
    });

});

export const getPersonalDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.personal");

    const personal = user.userData.personal;

    if (!personal) {
        return next(new ErrorHandler("No Personal Details Found", 404));
    }

    res.status(200).json({
        success: true,
        personal,
    });
});