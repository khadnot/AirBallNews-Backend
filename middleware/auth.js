"use strict";

/** Middleware to handle common auth cases in routes 
 * 
 * If token provided, verify it, and if valid, store token payload 
 * on res.locals
 * 
 */ 

import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next();
    }
}

export function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) throw new Error('Unauthorized');
        return next();
    } catch (err) {
        return next(err);
    }
}

export function ensureCorrectUser(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && (user.username === req.params.username))) {
            throw new Error('Unauthorized');
        }
        return next();
      } catch (err) {
          return next(err);
      }
}