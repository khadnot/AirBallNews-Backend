"use strict"

// User routes

import User from '../models/user.js';
import express from 'express';

const router = new express.Router();

router.get('/:username', async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch(err) {
        return next(err);
    }
});

router.patch('/:username', async function (req, res, next) {
    try {
        const user = await User.update(req.params.username, req.body);
        return res.json({ user });
    } catch(err) {
        return next(err);
    }
})

export default router;