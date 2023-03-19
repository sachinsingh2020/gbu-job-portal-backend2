import express from 'express'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import ErrorMiddleware from './middlewares/Error.js';
import cors from 'cors';

config({
    path: "./config/config.env",
});
const app = express();

// Using Middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


// Importing & Using Routes
import user from './routes/userRoutes.js';
import personal from './routes/personalRoutes.js';
import appliedFor from './routes/appliedForRoutes.js';
import education from './routes/educationRoutes.js';
import phdDetails from './routes/phdDetailsRoutes.js';
import teachingExperience from './routes/teachingExperienceRoutes.js';
import research from './routes/researchRoutes.js';
import conference from './routes/conferenceRoutes.js';
import general from './routes/generalRoutes.js';

app.use('/api/v1', user);
app.use('/api/v1', personal);
app.use('/api/v1', education);
app.use('/api/v1', phdDetails);
app.use('/api/v1', teachingExperience);
app.use('/api/v1', research);
app.use('/api/v1', conference);
app.use('/api/v1', general);
app.use('/api/v1', appliedFor);


export default app

app.use(ErrorMiddleware);
