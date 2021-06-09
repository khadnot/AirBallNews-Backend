"use strict";

// Express app for Air Ball News

import express from 'express';
import cors from 'cors';
import { PORT } from './config.js'

import router from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/signup', router);

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}!`)
});

export default app;