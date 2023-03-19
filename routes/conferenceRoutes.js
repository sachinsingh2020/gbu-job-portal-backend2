import express from 'express';
import { createInterNationalConference, createNationalConference, deleteInterNationalConference, deleteNationalConference, getInterNationalConferenceDetails, getNationalConferenceDetails } from '../controllers/conferenceController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();
// National Conference 
router.route('/conference/national/create').post(isAuthenticated, createNationalConference);
router.route('/conference/national/details').get(isAuthenticated, getNationalConferenceDetails)
router.route('/conference/national/delete/:id').delete(isAuthenticated, deleteNationalConference);

// InterNational Conference
router.route('/conference/international/create').post(isAuthenticated, createInterNationalConference);
router.route('/conference/international/details').get(isAuthenticated, getInterNationalConferenceDetails);
router.route('/conference/international/delete/:id').delete(isAuthenticated, deleteInterNationalConference);

export default router;