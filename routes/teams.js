"use strict";

// Team routes

import Team from '../models/team.js';
import express from 'express';

const router = new express.Router();

router.get('/', async function (req, res, next) {
    try {
        let teams = await Team.allTeams();
        return res.json({ teams });
    } catch(err) {
        return next(err);
    }
})

router.get('/:team', async function (req, res, next) {
    try {
        let team = await Team.getTeamPlayers(req.params.team);
        return res.json({ team });
    } catch(err) {
        return next(err);
    }
})

export default router;

