import express from 'express';
import { deleteUser, finalSubmission, forgetPassword, getAllUsers, getMyProfile, getTheUserDetails, login, logout, register, resetPassword } from '../controllers/userController.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// To Register a New User 
router.route('/register').post(register);
// Login 
router.route('/login').post(login);
// Logout 
router.route('/logout').get(logout);
// Get my Profile 
router.route('/me').get(isAuthenticated, getMyProfile);
// Forget Pasword 
router.route('/forgetpassword').post(forgetPassword);
// Reset Password 
router.route('/resetpassword/:token').put(resetPassword);

router.route('/finalsubmission/:id').post(finalSubmission);

// ADMIN ROUTES 

// Get All Users
router.route('/admin/users').get(isAuthenticated, authorizeAdmin, getAllUsers);

router.route('/admin/getuser/:id').get(isAuthenticated, authorizeAdmin, getTheUserDetails);

router.route('/admin/delete/:id').delete(isAuthenticated, authorizeAdmin, deleteUser);


export default router;