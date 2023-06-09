import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Graduation } from "../models/Education.js";
import { PostGraduation } from "../models/Education.js";
import { MPhil } from "../models/Education.js";
import { Phd } from "../models/Education.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import { User } from "../models/User.js";

export const createEducationGraduation = catchAsyncError(async (req, res, next) => {
    let { university, specialization, yearOfPassing, percentageOfMarks, classGrade } = req.body;
    let file = null;

    const user = await User.findById(req.user._id).populate("userData.education.graduation");

    if (req.file) {
        file = req.file;


        const fileUri = getDataUri(file);

        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);


        if (user.userData.education.graduation) {
            if (user.userData.education.graduation.selfAttestedCopy.public_id) {
                await cloudinary.v2.uploader.destroy(user.userData.education.graduation.selfAttestedCopy.public_id);
                await Graduation.deleteOne({ _id: user.userData.education.graduation._id });
            }
        }

        user.userData.education.graduation = await Graduation.create({
            university,
            specialization,
            yearOfPassing,
            percentageOfMarks,
            classGrade,
            selfAttestedCopy: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
            },
        })

        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "Graduation Details Saved Successfully",
        });
    }
    else {

        if (user.userData.education.graduation) {
            if (user.userData.education.graduation.selfAttestedCopy.public_id) {
                await cloudinary.v2.uploader.destroy(user.userData.education.graduation.selfAttestedCopy.public_id);
                await Graduation.deleteOne({ _id: user.userData.education.graduation._id });
            }
        }

        user.userData.education.graduation = await Graduation.create({
            university,
            specialization,
            yearOfPassing,
            percentageOfMarks,
            classGrade,
            selfAttestedCopy: {
                public_id: "Not Provided",
                url: "Not Provided",
            },
        })
        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "Redirected to Post Graduation Details",
        });
    }



});

export const getGraduationDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.education.graduation");

    const graduation = user.userData.education.graduation;

    if (!graduation) {
        return next(new ErrorHandler("Graduation Details Not Found", 404));
    }

    res.status(200).json({
        success: true,
        graduation,
    });
});

export const createEducationPostGraduation = catchAsyncError(async (req, res, next) => {
    let { university, specialization, yearOfPassing, percentageOfMarks, classGrade } = req.body;
    let file = null;

    const user = await User.findById(req.user._id).populate("userData.education.postGraduation");

    if (user.userData.education.postGraduation) {
        if (user.userData.education.postGraduation.selfAttestedCopy.public_id) {
            await cloudinary.v2.uploader.destroy(user.userData.education.postGraduation.selfAttestedCopy.public_id);
            await PostGraduation.deleteOne({ _id: user.userData.education.postGraduation._id });
        }
    }

    if (req.file) {
        file = req.file;


        const fileUri = getDataUri(file);

        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);





        user.userData.education.postGraduation = await PostGraduation.create({
            university,
            specialization,
            yearOfPassing,
            percentageOfMarks,
            classGrade,
            selfAttestedCopy: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
            },
        })

        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "PostGraduation Details Saved Successfully",
        });
    }
    else {

        user.userData.education.postGraduation = await PostGraduation.create({
            university,
            specialization,
            yearOfPassing,
            percentageOfMarks,
            classGrade,
            selfAttestedCopy: {
                public_id: "Not Provided",
                url: "Not Provided",
            },
        })
        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "Redirected to MPhil Details",
        });
    }

});

export const getPostGraduationDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.education.postGraduation");

    const postGraduation = user.userData.education.postGraduation;


    if (!postGraduation) {
        return next(new ErrorHandler("PostGraduation Details Not Found", 404));
    }

    res.status(200).json({
        success: true,
        postGraduation,
    });
});

export const createEducationMphil = catchAsyncError(async (req, res, next) => {
    const { university, specialization, yearOfPassing, percentageOfMarks, classGrade } = req.body;
    const user = await User.findById(req.user._id).populate("userData.education.mPhil");

    if (user.userData.education.mPhil) {
        if (user.userData.education.mPhil.selfAttestedCopy.public_id) {
            await cloudinary.v2.uploader.destroy(user.userData.education.mPhil.selfAttestedCopy.public_id);
            await MPhil.deleteOne({ _id: user.userData.education.mPhil._id });
        }
    }

    if (req.file) {
        const file = req.file;

        const fileUri = getDataUri(file);

        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);




        user.userData.education.mPhil = await MPhil.create({
            university,
            specialization,
            yearOfPassing,
            percentageOfMarks,
            classGrade,
            selfAttestedCopy: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
            },
        })

        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "Mphil Details Saved Successfully",
        });
    }
    else {
        user.userData.education.mPhil = await MPhil.create({
            university,
            specialization,
            yearOfPassing,
            percentageOfMarks,
            classGrade,
            selfAttestedCopy: {
                public_id: "Not Provided",
                url: "Not Provided",
            },
        })

        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "Redirected to Phd Details",
        });
    }

});

export const getMphilDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.education.mPhil");

    const mPhil = user.userData.education.mPhil;

    if (!mPhil) return next(new ErrorHandler("No Mphil Details Found", 404));

    res.status(200).json({
        success: true,
        mPhil,
    });
});

export const createEducationPhd = catchAsyncError(async (req, res, next) => {
    const { university, specialization, yearOfPassing, percentageOfMarks, classGrade } = req.body;
    const user = await User.findById(req.user._id).populate("userData.education.phd");

    if (user.userData.education.phd) {
        if (user.userData.education.phd.selfAttestedCopy.public_id) {
            await cloudinary.v2.uploader.destroy(user.userData.education.phd.selfAttestedCopy.public_id);
            await Phd.deleteOne({ _id: user.userData.education.phd._id });
        }
    }
    if (req.file) {
        const file = req.file;

        const fileUri = getDataUri(file);

        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);


        user.userData.education.phd = await Phd.create({
            university,
            specialization,
            yearOfPassing,
            percentageOfMarks,
            classGrade,
            selfAttestedCopy: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
            },
        })

        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "Phd Details Saved Successfully",
        });
    }
    else {
        user.userData.education.phd = await Phd.create({
            university,
            specialization,
            yearOfPassing,
            percentageOfMarks,
            classGrade,
            selfAttestedCopy: {
                public_id: "Not Provided",
                url: "Not Provided",
            },
        })

        await user.save();
        res.status(201).json({
            success: true,
            user,
            message: "Redirected to Phd Details",
        });
    }
});

export const getPhdDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("userData.education.phd");

    const phd = user.userData.education.phd;

    if (!phd) return next(new ErrorHandler("No Phd Details Found", 404));

    res.status(200).json({
        success: true,
        phd,
    });
});

