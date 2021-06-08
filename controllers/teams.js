import teamModel from '../models/teamModel.js'

export const getTeams = async (req, res) => {
    try {
        const teams = await teamModel.find();

        console.log(teams);

        if (res.status(200)) {
            console.log('You Got Teams!!')
        } else {
            console.log('error connecting to database')
        }
    } catch(err) {
        res.status(404).json({ message: err.message })
    }
};

export const postTeam = async (req, res) => {
    const team = req.body;

    const addTeam = new teamModel(team);

    try {
        await addTeam.save();

        if (res.status(201)) {
            addTeam.save();
        } else {
            console.log('error adding team to database')
        }
    } catch(err) {
        console.status(409).json({ message: err.message })
    }
};