import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { TeachingExperience } from "../models/TeachingExperience.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const createTeachingExperience = catchAsyncError(async (req, res, next) => {
    const { positionHeld, organizationInstitute, dateOfJoining, dateOfLeaving, totalPeriodDuration, natureOfDuties, courseTaught, levelUgPg, lastPay } = req.body;

    if (!positionHeld || !organizationInstitute || !dateOfJoining || !dateOfLeaving || !totalPeriodDuration || !natureOfDuties || !courseTaught || !levelUgPg || !lastPay) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }


    const teachingExperience = await TeachingExperience.create({
        positionHeld,
        organizationInstitute,
        dateOfJoining,
        dateOfLeaving,
        totalPeriodDuration,
        natureOfDuties,
        courseTaught,
        levelUgPg,
        lastPay,
    });

    const user = await User.findById(req.user._id);
    user.userData.teachingExperience.push(teachingExperience._id);

    await user.save();

    res.status(201).json({
        success: true,
        user,
        teachingExperience: teachingExperience,
        message: "Teaching Experience Added Successfully",
    });
});

export const getTeachingExperienceDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('userData.teachingExperience');

    const teachingExperience = user.userData.teachingExperience;

    if (!teachingExperience || teachingExperience.length === 0) {
        return next(new ErrorHandler("No Teaching Experience Found", 404));
    }

    res.status(200).json({
        success: true,
        teachingExperience,
    });
});

export const deleteTeachingExperience = catchAsyncError(async (req, res, next) => {
    
    const teachingExperience = await TeachingExperience.findByIdAndDelete(req.params.id);
    
    if (!teachingExperience) {
        return next(new ErrorHandler("Teaching Experience Not Found", 404));
    }
    
    const user = await User.findById(req.user._id);
    user.userData.teachingExperience.pull(teachingExperience._id);
    
    await user.save();
    
    res.status(200).json({
        success: true,
        message: "Teaching Experience Deleted Successfully",
    });
});
