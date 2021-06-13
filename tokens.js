import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './config.js';

// return signed JWT from user data

async function createToken(username) {

    return jwt.sign({ 'username': username}, SECRET_KEY);
    
}

export default createToken;

