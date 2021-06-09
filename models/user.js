import bcrypt from 'bcrypt';
import { client } from '../db.js';
import { BCRYPT_WORK_FACTOR } from '../config.js';

const dbName = 'users';

class User {

    // Register new user and return user info

    static async register({ firstName, lastName, username, password, email }) {
        try {
            await client.connect();
            console.log('Connected to MongoDB server');
            const db = client.db(dbName);
            const col = db.collection('userInfo');

            const duplicateUserCheck = await col.find({ username });

            if (duplicateUserCheck[0]) {
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

            const u = await col.insertOne(userDoc);

            const newUser = await col.findOne();

            return newUser;

        } catch(err) {
            console.log(err.message);
        }
    }
}

export default User;
