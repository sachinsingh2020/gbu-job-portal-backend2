import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { AppliedFor } from "../models/AppliedFor.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const createAppliedFor = catchAsyncError(async (req, res, next) => {
    const { postApplied, department, school, specialization, advertisement } = req.body;

    if (!postApplied || !department || !school || !specialization || !advertisement) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    const user = await User.findById(req.user._id).populate("userData.appliedFor");

    if (user.userData.appliedFor) {
        await AppliedFor.deleteOne({ _id: user.userData.appliedFor._id });
    }

    user.userData.appliedFor = await AppliedFor.create({
        postApplied,
        department,
        school,
        specialization,
        advertisement,
    });

    await user.save();

    res.status(201).json({
        success: true,
        user,
        message: "Applied For Saved Successfully",
    });
});

export const getAppliedFor = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.appliedFor");

    const appliedFor = user.userData.appliedFor;

    if (!appliedFor) {
        return next(new ErrorHandler("No Applied For Found", 404));
    }

    res.status(200).json({
        success: true,
        appliedFor,
    });
});