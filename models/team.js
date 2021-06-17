import { client } from '../db.js';

const dbName = 'teams';

class Team {

    // get players info from team
    static async getTeam(team) {
        await client.connect();
        console.log('Connected to MongoDB server');
        const db = client.db(dbName);
        // how to get collection by team!?!?!
        const col = db.collection(team); // collection of team code ex. BKN, BOS, LAL, etc
        const nameRes = await col.distinct( 'playerId' ); // all the data for starting five players

        if (!nameRes) throw new Error('Players not found');

        return nameRes;
    }
}

export default Team;