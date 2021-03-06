// Database setup for app

import pkg from 'mongodb';
const { MongoClient } = pkg;
import { DB_URI } from './config.js';

export const client = new MongoClient(DB_URI);

await client.connect().then(
    console.log('Connected to MongoDB server'));