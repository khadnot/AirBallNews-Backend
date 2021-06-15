"use strict";

// Express app for Air Ball News

import express from 'express';
import cors from 'cors';

import { authenticateJWT } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
//import usersRoutes from './routes/users.js';
//import teamsRoutes from './routes/teams.js';

import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
//app.use('/login', authRoutes); // just for testing
//app.use('/users', usersRoutes);
//app.use('/teams', teamsRoutes);

// Handle 404 errors
app.use(function (req, res, next) {
    return next(new Error('Page Not Found'))
});

export default app;