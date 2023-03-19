import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { NationalResearch } from "../models/Research.js";
import { InterNationalResearch } from "../models/Research.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";


export const createNationalResearch = catchAsyncError(async (req, res, next) => {
    const { nameOfJournel, impactFactor, noOfPaperPublished, broadAreas } = req.body;


    const nationalResearch = await NationalResearch.create({
        nameOfJournel,
        impactFactor,
        noOfPaperPublished,
        broadAreas,
    });

    const user = await User.findById(req.user._id);

    user.userData.research.nationalResearch.push(nationalResearch._id);

    await user.save();
    res.status(201).json({
        success: true,
        user,
        message: "National Research Details Saved Successfully",
    });
});

export const getNationalResearchDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.research.nationalResearch");

    const nationalResearchDetails = user.userData.research.nationalResearch;

    if (!nationalResearchDetails) {
        return next(new ErrorHandler("No National Research Details Found", 404));
    }

    res.status(200).json({
        success: true,
        nationalResearchDetails,
    });
});

export const deleteNationalResearch = catchAsyncError(async (req, res, next) => {
    const nationalResearch = await NationalResearch.findByIdAndDelete(req.params.id);

    if (!nationalResearch) {
        return next(new ErrorHandler("National Research Details Not Found", 404));
    }

    const user = await User.findById(req.user._id);
    user.userData.research.nationalResearch.pull(nationalResearch._id);

    await user.save();

    res.status(200).json({
        success: true,
        message: "National Research Details Deleted Successfully",
    });
});


export const createInterNationalResearch = catchAsyncError(async (req, res, next) => {
    const { nameOfJournel, impactFactor, noOfPaperPublished, broadAreas } = req.body;


    const interNationalResearch = await InterNationalResearch.create({
        nameOfJournel,
        impactFactor,
        noOfPaperPublished,
        broadAreas,
    });

    const user = await User.findById(req.user._id);

    user.userData.research.interNationalResearch.push(interNationalResearch._id);

    await user.save();

    res.status(201).json({
        success: true,
        user,
        message: "InterNational Research Details Saved Successfully",
    });
});

export const getInterNationalResearchDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.research.interNationalResearch");

    const interNationalResearchDetails = user.userData.research.interNationalResearch;

    if (!interNationalResearchDetails) {
        return next(new ErrorHandler("No InterNational Research Details Found", 404));
    }

    res.status(200).json({
        success: true,
        interNationalResearchDetails,
    });
});

export const deleteInterNationalResearch = catchAsyncError(async (req, res, next) => {
    const interNationalResearch = await InterNationalResearch.findByIdAndDelete(req.params.id);

    if (!interNationalResearch) {
        return next(new ErrorHandler("InterNational Research Details Not Found", 404));
    }

    const user = await User.findById(req.user._id);
    user.userData.research.interNationalResearch.pull(interNationalResearch._id);

    await user.save();

    res.status(200).json({
        success: true,
        message: "InterNational Research Details Deleted Successfully",
    });
});