"use strict";

// Express app for Air Ball News

import express from 'express';
import cors from 'cors';

import { authenticateJWT } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import teamRoutes from './routes/teams.js';
import gameRoutes from './routes/games.js';

import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);
app.use('/games', gameRoutes);

// Handle 404 errors
app.use(function (req, res, next) {
    return next(new Error('Page Not Found'))
});

// Generic error handler
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

export default app;