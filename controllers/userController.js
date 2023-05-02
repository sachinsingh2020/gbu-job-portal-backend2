import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { User } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { Personal } from "../models/Personal.js";
import { Graduation } from "../models/Education.js";
import { PostGraduation } from "../models/Education.js";
import { MPhil } from "../models/Education.js";
import { Phd } from "../models/Education.js";
import { PhdDetails } from "../models/PhdDetails.js";
import { TeachingExperience } from "../models/TeachingExperience.js";
import { NationalResearch } from "../models/Research.js";
import { InterNationalResearch } from "../models/Research.js";
import { NationalConference } from "../models/Conference.js";
import { InterNationalConference } from "../models/Conference.js";
import { General } from "../models/General.js";
import cloudinary from "cloudinary";







export const register = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  if (password.length < 6) {
    return next(new ErrorHandler("Password must be at least 6 characters long", 400));
  }

  if (phoneNumber.length !== 10) {
    return next(new ErrorHandler("Please enter a valid Phone Number", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 409));
  }

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role: 'admin',
      isSubmitted: "true",
    });
  } else {
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
  }

  sendToken(res, user, "Registered Successfully", 201);

});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome back, ${user.firstName}`, 200);
})

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User not found", 400));

  const resetToken = await user.getResetToken();

  await user.save();

  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;

  // Send token via email
  await sendEmail(user.email, "Reset Password for GBU Job portal", message);

  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new ErrorHandler("Token is invalid or has been expired", 401));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

// Admin Controllers

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  const dummy = user.populate("userData.education.graduation");
  const dummy2 = user.populate("userData.education.postGraduation");

  const personal = await Personal.findById(user.userData.personal);
  if (personal) {
    await cloudinary.v2.uploader.destroy(personal.profilePic.public_id);
    await Personal.deleteOne({ _id: personal._id });
  }

  const educationGraduation = await Graduation.findById(user.userData.education.graduation);
  if (educationGraduation) {
    if (educationGraduation.selfAttestedCopy.public_id) {
      await cloudinary.v2.uploader.destroy(educationGraduation.selfAttestedCopy.public_id);
      await Graduation.deleteOne({ _id: educationGraduation._id });
    }
  }

  const educationPostGraduation = await PostGraduation.findById(user.userData.education.postGraduation);
  if (educationPostGraduation) {
    if (educationPostGraduation.selfAttestedCopy.public_id) {
      await cloudinary.v2.uploader.destroy(educationPostGraduation.selfAttestedCopy.public_id);
      await PostGraduation.deleteOne({ _id: educationPostGraduation._id });
    }
  }

  const educationMPhil = await MPhil.findById(user.userData.education.mPhil);
  if (educationMPhil) {
    if (educationMPhil.selfAttestedCopy.public_id) {
      await cloudinary.v2.uploader.destroy(educationMPhil.selfAttestedCopy.public_id);
      await MPhil.deleteOne({ _id: educationMPhil._id });
    }
  }

  const educationPhd = await Phd.findById(user.userData.education.phd);
  if (educationPhd) {
    if (educationPhd.selfAttestedCopy.public_id) {
      await cloudinary.v2.uploader.destroy(educationPhd.selfAttestedCopy.public_id);
      await Phd.deleteOne({ _id: educationPhd._id });
    }
  }
  await User.deleteOne({ _id: user._id });

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});



export const getTheUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));
  // console.log(user.userData);

  const dummy = await user.populate('userData.teachingExperience');
  const dummy2 = await user.populate('userData.conference.nationalConference');
  const dummy3 = await user.populate('userData.conference.interNationalConference');
  const dummy4 = await user.populate('userData.research.nationalResearch');
  const dummy5 = await user.populate('userData.research.interNationalResearch');

  const userAllDetails = {
    personal: await Personal.findById(user.userData.personal),
    educationGraduation: await Graduation.findById(user.userData.education.graduation),
    educationPostGraduation: await PostGraduation.findById(user.userData.education.postGraduation),
    educationMphil: await MPhil.findById(user.userData.education.mPhil),
    educationPhd: await Phd.findById(user.userData.education.phd),
    teachingExperience: await user.userData.teachingExperience,
    nationalResearchDetails: await user.userData.research.nationalResearch,
    interNationalResearchDetails: await user.userData.research.interNationalResearch,
    nationalConference: await user.userData.conference.nationalConference,
    interNationalConference: await user.userData.conference.interNationalConference,
    generalDetails: await General.findById(user.userData.general),
    phdDetails: await PhdDetails.findById(user.userData.phdDetails),
  }


  res.status(200).json({
    success: true,
    userAllDetails,
  });
});

export const finalSubmission = catchAsyncError(async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  user.isSubmitted = "true";

  await user.save();

  res.status(200).json({
    success: true,
    message: "Final Submitted Successfully",
  });
});


export const reSubmitForm = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));


  const dummy = user.populate("userData.education.graduation");
  const dummy2 = user.populate("userData.education.postGraduation");
  const dummy3 = user.populate("userData.education.mPhil");
  const dummy4 = user.populate("userData.education.phd");


  const educationGraduation = await Graduation.findById(user.userData.education.graduation);
  if (educationGraduation) {
    if (educationGraduation.selfAttestedCopy.public_id) {
      await cloudinary.v2.uploader.destroy(educationGraduation.selfAttestedCopy.public_id);
      await Graduation.deleteOne({ _id: educationGraduation._id });
    }
  }

  const educationPostGraduation = await PostGraduation.findById(user.userData.education.postGraduation);
  if (educationPostGraduation) {
    if (educationPostGraduation.selfAttestedCopy.public_id) {
      await cloudinary.v2.uploader.destroy(educationPostGraduation.selfAttestedCopy.public_id);
      await PostGraduation.deleteOne({ _id: educationPostGraduation._id });
    }
  }

  const educationMPhil = await MPhil.findById(user.userData.education.mPhil);
  if (educationMPhil) {
    if (educationMPhil.selfAttestedCopy.public_id) {
      await cloudinary.v2.uploader.destroy(educationMPhil.selfAttestedCopy.public_id);
      await MPhil.deleteOne({ _id: educationMPhil._id });
    }
  }

  const educationPhd = await Phd.findById(user.userData.education.phd);
  if (educationPhd) {
    if (educationPhd.selfAttestedCopy.public_id) {
      await cloudinary.v2.uploader.destroy(educationPhd.selfAttestedCopy.public_id);
      await Phd.deleteOne({ _id: educationPhd._id });
    }
  }

  const teachingExperience = user.userData.teachingExperience;
  await Promise.all(teachingExperience.map(async (teaching) => {
    await TeachingExperience.findByIdAndDelete(teaching._id);
    user.userData.teachingExperience.pull(teaching._id);
  }));

  const nationalResearchDetails = user.userData.research.nationalResearch;
  await Promise.all(nationalResearchDetails.map(async (nationalResearch) => {
    await NationalResearch.findByIdAndDelete(nationalResearch._id);
    user.userData.research.nationalResearch.pull(nationalResearch._id);
  }));

  const interNationalResearchDetails = user.userData.research.interNationalResearch;
  // console.log(interNationalResearchDetails)
  await Promise.all(interNationalResearchDetails.map(async (interNationalResearch) => {
    await InterNationalResearch.findByIdAndDelete(interNationalResearch._id);
    user.userData.research.interNationalResearch.pull(interNationalResearch._id);
  }));

  const nationalConference = user.userData.conference.nationalConference;
  // console.log(nationalConference);
  await Promise.all(nationalConference.map(async (nationalConference) => {
    await NationalConference.findByIdAndDelete(nationalConference._id);
    user.userData.conference.nationalConference.pull(nationalConference._id);
  }));

  const interNationalConference = user.userData.conference.interNationalConference;
  // console.log(interNationalConference);
  await Promise.all(interNationalConference.map(async (interNationalConference) => {
    await InterNationalConference.findByIdAndDelete(interNationalConference._id);
    user.userData.conference.interNationalConference.pull(interNationalConference._id);
  }));

  if (user.isSubmitted === "true") {
    user.isSubmitted = "false";
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Resubmit form again",
  });
})

export const changeIsSubmitted = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  user.isSubmitted = "false";

  await user.save();

  res.status(200).json({
    success: true,
    message: "Redirected to Home Page",
  });
});