import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { NationalConference } from "../models/Conference.js";
import { InterNationalConference } from "../models/Conference.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const createNationalConference = catchAsyncError(async (req, res, next) => {
    const { nameOfConference, whenAndWhere } = req.body;

    const nationalConference = await NationalConference.create({
        nameOfConference,
        whenAndWhere,
    });

    const user = await User.findById(req.user._id);

    user.userData.conference.nationalConference.push(nationalConference._id);

    await user.save();

    res.status(201).json({
        success: true,
        message: "National Conference Details Saved Successfully",
        user,
    });
});

export const getNationalConferenceDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.conference.nationalConference");

    const nationalConferenceDetails = user.userData.conference.nationalConference;

    if (!nationalConferenceDetails) {
        return next(new ErrorHandler("No National Conference Details Found", 404));
    }

    res.status(200).json({
        success: true,
        nationalConferenceDetails,
    });
});

export const deleteNationalConference = catchAsyncError(async (req, res, next) => {
    const nationalConference = await NationalConference.findByIdAndDelete(req.params.id);

    if (!nationalConference) {
        return next(new ErrorHandler("National Conference Details Not Found", 404));
    }

    const user = await User.findById(req.user._id);
    user.userData.conference.nationalConference.pull(nationalConference._id);

    await user.save();

    res.status(200).json({
        success: true,
        message: "National Conference Details Deleted Successfully",
    });
});


export const createInterNationalConference = catchAsyncError(async (req, res, next) => {
    const { nameOfConference, whenAndWhere } = req.body;

    const interNationalConference = await InterNationalConference.create({
        nameOfConference,
        whenAndWhere,
    });

    const user = await User.findById(req.user._id);

    user.userData.conference.interNationalConference.push(interNationalConference._id);

    await user.save();

    res.status(201).json({
        success: true,
        message: "InterNational Conference Details Saved Successfully",
        user,
    });
});

export const getInterNationalConferenceDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.conference.interNationalConference");

    const interNationalConferenceDetails = user.userData.conference.interNationalConference;

    if (!interNationalConferenceDetails) {
        return next(new ErrorHandler("No InterNational Conference Details Found", 404));
    }

    res.status(200).json({
        success: true,
        interNationalConferenceDetails,
    });
});

export const deleteInterNationalConference = catchAsyncError(async (req, res, next) => {
    const interNationalConference = await InterNationalConference.findByIdAndDelete(req.params.id);

    if (!interNationalConference) {
        return next(new ErrorHandler("InterNational Conference Details Not Found", 404));
    }

    const user = await User.findById(req.user._id);
    user.userData.conference.interNationalConference.pull(interNationalConference._id);

    await user.save();

    res.status(200).json({
        success: true,
        message: "InterNational Conference Details Deleted Successfully",
    });
});

