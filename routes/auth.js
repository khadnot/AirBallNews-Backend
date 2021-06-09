// Authorization routes

import User from '../models/user.js';
import express from 'express';
const router = new express.Router();
//import createToken from '../helpers/createToken.js'

router.post('/', async function (req, res, next) {
    try {
        let user = await User.register(req.body);
        return res.status(201).json({ user });
    } catch(err) {
        return next(err);
    }
});

export default router;