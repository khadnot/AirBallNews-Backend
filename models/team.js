import { client } from '../db.js';
import axios from 'axios';
import 'dotenv/config.js';
const { NBA_API_KEY } = process.env;

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

    // get team logo from NBA API
    static async getTeamLogos(teamId) {
        let teamLogo = "";
        
        const options = await {
            method: 'GET',
            url: `https://api-nba-v1.p.rapidapi.com/teams/teamId/${teamId}`,
            headers: {
              'x-rapidapi-key': NBA_API_KEY,
              'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        await axios.request(options).then(res => {
            teamLogo = res.data.api.teams[0].logo;
        });

        return teamLogo;
    }
}

export default Team;