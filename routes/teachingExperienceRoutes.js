import express from 'express';
import { createTeachingExperience, deleteTeachingExperience, getTeachingExperienceDetails } from '../controllers/techingExperienceController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.route('/teachingexperience/create').post(isAuthenticated, createTeachingExperience);

router.route('/teachingexperience/details').get(isAuthenticated, getTeachingExperienceDetails);

router.route('/teachingexperience/delete/:id').delete(isAuthenticated, deleteTeachingExperience);



export default router;