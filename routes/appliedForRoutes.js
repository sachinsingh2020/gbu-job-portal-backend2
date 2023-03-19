import express from 'express';
import { createAppliedFor, getAppliedFor } from '../controllers/appliedForController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.route('/appliedfor/create').post(isAuthenticated, createAppliedFor);
router.route('/appliedfor/details').get(isAuthenticated, getAppliedFor);

export default router;