import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    teamCode: String,
    teamCity: String,
    teamName: String,
},
{
    versionKey: false
});

const teamModel = mongoose.model('teams', teamSchema);

export default teamModel;