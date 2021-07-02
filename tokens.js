import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

// return signed JWT from user data

async function createToken(username) {

    return jwt.sign({ 'username': username}, process.env.SECRET_KEY);
    
}

export default createToken;

