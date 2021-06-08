import userModel from '../models/userModel.js'

export const login = async (req, res) => {
    try {
        const user = req.body;

        let addUser = new userModel(user);

        try {
            await addUser.save();

            if(res.status(201)) {
                addUser.save();
            } else {
                console.log('error adding user to database');
            }
        } catch(err) {
            console.status(409).json({ message: err.message });
        }

    } catch(err) {
        console.log(err.message);
    }
};