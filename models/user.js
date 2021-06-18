import bcrypt from 'bcrypt';
import { client } from '../db.js';
import { BCRYPT_WORK_FACTOR } from '../config.js';

const dbName = 'users';

class User {

    /** Authenticate user with username and password 
     * 
     * Returns { firstName, lastName, username, email}
     * 
     * Throws error is user not found or wrong password
     * */ 

    static async authenticate({ username, password }) {
        try {
            await client.connect();
            console.log('Connected to MongoDB server - #1');
            const db = client.db(dbName);
            const col = db.collection('userInfo');

            // try and find user
            const user = await col.findOne({ username : username });

            if (user) {
                // compare hashed password to a new hash from password
                const isValid = await bcrypt.compare(password, user.password);
                if (isValid === true) {
                    delete user.password;
                    return username;
                }
            }
            throw new Error('Invalid username/password');

        } catch(err) {
            console.log(err.message);
        }
    }


    // Register new user and return user info

    static async register({ firstName, lastName, username, password, email }) {
        try {
            await client.connect();
            console.log('Connected to MongoDB server');
            const db = client.db(dbName);
            const col = db.collection('userInfo');

            // check for duplicate user
            const duplicateUserCheck = await col.findOne({ username : username });

            if (duplicateUserCheck) {
                throw new Error(`Duplicate username found: ${username}`);
            }

            const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

            let userDoc = {
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": hashedPwd,
                "email": email
            }

            await col.insertOne(userDoc);

            const newUser = await col.findOne({ username : username }); 

            return newUser.username; // return new user's username for token

        } catch(err) {
            console.log(err.message);
        }
    }

    // Given a username, returns data about user
    static async get(username) {
        await client.connect();
        console.log('Connected to MongoDB server');
        const db = client.db(dbName);
        const col = db.collection('userInfo');
        const userRes = await col.findOne({ username : username })
        const user = userRes;

        if (!user) throw new Error(`No user: ${username}`);

        return user;
    }

    static async update(username, data) {
        await client.connect();
        console.log('Connected to MongoDB server');
        const db = client.db(dbName);
        const col = db.collection('userInfo');

        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        await col.update({ username: username}, 
            {$set: { 'firstName': data.firstName, 
                        'lastName': data.lastName,
                            'email': data.email}});

        const userRes = await col.findOne({ username : username });
        const user = userRes;

        if (!user) throw new Error(`No user: ${username}`);

        return user;
    }
}

export default User;
