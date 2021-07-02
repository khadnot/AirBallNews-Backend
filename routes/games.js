"use strict";

// Team routes

import Game from '../models/game.js';
import express from 'express';

const router = new express.Router();

router.get('/:teamId', async function (req, res, next) {
    try {
        let latestGame = await Game.getLatestGame(req.params.teamId);
        return res.json({ latestGame });
    } catch(err) {
        return next(err);
    }
})

export default router;