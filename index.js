import express from 'express';
//import mongoose from 'mongoose';
import cors from 'cors';
import pkg from 'mongodb';
const { MongoClient } = pkg;

import teamRoutes from './routes/teams.js';
import loginRoute from './routes/login.js';
//import signupRoute from './routes/signup'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//app.use('/', homepage) // do I need one for the homepage!?!?
app.use('/teams', teamRoutes);
app.use('/login', loginRoute);
//app.use('/signup', signupRoutes) // after login works, set up signup!

const CONNECTION_URL =
    'mongodb+srv://kenbo:LMPBizkit88@capstone2.lkazn.mongodb.net/users?retryWrites=true&w=majority'; // works for local database, but doesn't work for cloud db...
const PORT = process.env.PORT || 3001;
const client = new MongoClient(CONNECTION_URL);

const dbName = 'users';

async function run() {
    try {
        await client.connect();
        console.log('Connected to the Mongo server!');
        const db = client.db(dbName);

        // use collection teamInfo
        const col = db.collection('user_info');

        let teamDoc = {
            "firstName": "Barry",
            "lastName": "Sanders",
            "username": "bigbadbarry",
            "password": "am3r1c4$Te4m!",
            "email": "dlions20@gmail.com"
        }

        // insert single document, wait for promise
        const p = await col.insertOne(teamDoc);

        // find document
        const myDoc = await col.findOne();

        // print to console
        console.log(myDoc);

    } catch(err) {
        console.log(err.message);
    }

    finally {
        await client.close();
    }
}

run().catch(console.dir);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

/*
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(err => console.log(err.message));

const db = mongoose.connection;
db.once('open', _ => {
    console.log('Database connected:', CONNECTION_URL)
})
db.on('error', err => {
    console.error('connection error:', err)
})

mongoose.set('useFindAndModify', false);
*/