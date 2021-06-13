"use strict";

// Authorization routes

//import jsonschema from 'jsonschema';

import User from '../models/user.js';
import express from 'express';
const router = new express.Router();
import createToken from "../tokens.js";

router.post('/token', async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token });
    } catch(err) {
        return next(err);
    }
});

router.post('/register', async function (req, res, next) {
    try {
        const newUser = await User.register({ ...req.body });
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch(err) {
        return next(err);
    }
});

export default router;