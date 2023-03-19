import express from 'express';
import { createGeneralDetails, getGeneralDetails } from '../controllers/generalController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.route('/general/create').post(isAuthenticated, createGeneralDetails);

router.route('/general/details').get(isAuthenticated, getGeneralDetails);

export default router;