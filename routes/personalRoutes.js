import express from 'express';
import { createPersonal, getPersonalDetails } from '../controllers/personalController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

router.route('/createpersonal').post(isAuthenticated, singleUpload, createPersonal);
router.route('/getpersonaldetails').get(isAuthenticated, getPersonalDetails);

export default router;