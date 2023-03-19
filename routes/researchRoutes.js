import express from 'express';
import { createInterNationalResearch, createNationalResearch, deleteInterNationalResearch, deleteNationalResearch, getInterNationalResearchDetails, getNationalResearchDetails } from '../controllers/researchController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// National Research 
router.route('/research/national/create').post(isAuthenticated, createNationalResearch);
router.route('/research/national/details').get(isAuthenticated, getNationalResearchDetails)
router.route('/research/national/delete/:id').delete(isAuthenticated, deleteNationalResearch);

// InterNational Research 
router.route('/research/international/create').post(isAuthenticated, createInterNationalResearch);
router.route('/research/international/details').get(isAuthenticated, getInterNationalResearchDetails);
router.route('/research/international/delete/:id').delete(isAuthenticated, deleteInterNationalResearch);


export default router;