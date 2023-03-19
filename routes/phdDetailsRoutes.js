import express from 'express';
import { createPhdDetails, getPhdDetails } from '../controllers/phdDetailsController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.route('/createphddetails').post(isAuthenticated, createPhdDetails);

router.route('/getphddetails').get(isAuthenticated, getPhdDetails);

export default router;