import { client } from '../db.js';
import axios from 'axios';

const dbName = 'teams';

class Team {

    // get all NBA teams
    static async allTeams() {
        const db = await client.db(dbName);
        const col = await db.listCollections();
        
        let res = await col.toArray();
        let teams = [];

        for (let team of res) {
            teams.push(team.name)
        }
        
        return teams.sort();
    }

    // get players info from team
    static async getTeamPlayers(team) {
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