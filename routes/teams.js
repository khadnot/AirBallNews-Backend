"use strict";

// Team routes

import Team from '../models/team.js';
import express from 'express';

const router = new express.Router();

router.get('/', async function (req, res, next) {
    return res.json('Air Ball News Home');
})

router.get('/:team', async function (req, res, next) {
    try {
        let team = await Team.getTeam(req.params.team);
        return res.json({ team });
    } catch(err) {
        return next(err);
    }
})

export default router;

