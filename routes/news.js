"use strict";

// News routes

import News from '../models/news.js';
import express from 'express';

const router = new express.Router();

router.get('/:team', async function (req, res, next) {
    try {
        let teamNews = await News.getTeamNews(req.params.team);
        return res.json({ teamNews });
    } catch(err) {
        return next(err);
    }
})

export default router;