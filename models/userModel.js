import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String
},
{
    versionKey: false
});

const userModel = mongoose.model('users', userSchema);

export default userModel;