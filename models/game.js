import axios from 'axios';
import 'dotenv/config.js';

class Game {
    
    // get latest game from NBA-API
    static async getLatestGame(teamId) {
        let latestGame = {};

        const options = await {
            method: 'GET',
            url: `https://api-nba-v1.p.rapidapi.com/games/teamId/${teamId}`,
            headers: {
              'x-rapidapi-key': process.env.NBA_API_KEY,
              'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        await axios.request(options).then(res => {
            let games = res.data.api.games;
            for (let game of games.reverse()) {
                if (game.statusGame === 'Finished') {
                    latestGame = game;
                    break;
                }
            }
        });

        return latestGame;
    }
}

export default Game;