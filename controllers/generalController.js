import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { General } from "../models/General.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const createGeneralDetails = catchAsyncError(async (req, res, next) => {
    const { acceptSalary, mentionPeriod, acceptPosition, medicallyUnfit } = req.body;

    const user = await User.findById(req.user._id).populate("userData.general");

    if (user.userData.general) {
        await General.deleteOne({ _id: user.userData.general._id });
    }

    user.userData.general = await General.create({
        acceptSalary,
        mentionPeriod,
        acceptPosition,
        medicallyUnfit,
    });


    await user.save();

    res.status(201).json({
        success: true,
        message: "General Details Saved Successfully",
        user,
    });
});

export const getGeneralDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.general");

    const generalDetails = user.userData.general;

    if (!generalDetails) {
        return next(new ErrorHandler("No General Details Found", 404));
    }

    res.status(200).json({
        success: true,
        generalDetails,
    });
});

