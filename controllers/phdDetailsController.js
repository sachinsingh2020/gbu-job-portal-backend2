import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { PhdDetails } from "../models/PhdDetails.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const createPhdDetails = catchAsyncError(async (req, res, next) => {
    const { phdThesisTitle, researchAreaThesisWork, dateOfJoining, dateOfSubmission, dateOfCompletion, nameOfThesisSupervisor, partTimeFullTime, institutionUniversity } = req.body;


    const user = await User.findById(req.user._id).populate("userData.phdDetails");

    if (user.userData.phdDetails) {
        await PhdDetails.deleteOne({ _id: user.userData.phdDetails._id });
    }

    user.userData.phdDetails = await PhdDetails.create({
        phdThesisTitle,
        researchAreaThesisWork,
        dateOfJoining,
        dateOfSubmission,
        dateOfCompletion,
        nameOfThesisSupervisor,
        partTimeFullTime,
        institutionUniversity,
    });

    await user.save();

    res.status(201).json({
        success: true,
        user,
        message: "PhD Details Saved Successfully",
    });
});

export const getPhdDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.phdDetails");

    const phdDetails = user.userData.phdDetails;

    if (!phdDetails) {
        return next(new ErrorHandler("No PhD Details Found", 404));
    }

    res.status(200).json({
        success: true,
        phdDetails,
    });
});