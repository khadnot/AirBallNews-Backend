import { client } from '../db.js';

const dbName = 'teams';

class Team {

    // get players info from team
    static async getTeam(team) {
        const db = await client.db(dbName);
        const col = await db.collection(team); // collection of team code ex. BKN, BOS, LAL, etc.

        let res = await col.find().toArray();
        
        let players = [];
        for (let player of res) {
            players.push(player);
        }

        return players;
    }
}

export default Team;