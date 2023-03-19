import express from 'express';
import { createEducationGraduation, createEducationMphil, createEducationPhd, createEducationPostGraduation, getGraduationDetails, getMphilDetails, getPhdDetails, getPostGraduationDetails } from '../controllers/educationController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

router.route('/education/graduation').post(isAuthenticated, singleUpload, createEducationGraduation);
router.route('/education/graduationdetails').get(isAuthenticated, singleUpload, getGraduationDetails);

router.route('/education/postgraduation').post(isAuthenticated, singleUpload, createEducationPostGraduation);
router.route('/education/postgraduationdetails').get(isAuthenticated, singleUpload, getPostGraduationDetails);

router.route('/education/mphil').post(isAuthenticated, singleUpload, createEducationMphil);
router.route('/education/mphildetails').get(isAuthenticated, singleUpload, getMphilDetails);

router.route('/education/phd').post(isAuthenticated, singleUpload, createEducationPhd);
router.route('/education/phddetails').get(isAuthenticated, singleUpload, getPhdDetails);


export default router;