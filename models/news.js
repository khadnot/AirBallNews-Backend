import axios from 'axios';

class News {

    // get latest team news from News API
    static async getTeamNews(team) {
        const NEWS_API = 'a6cabd1a61ed4f74b9db44143a8370f5';
        const news = `https://newsapi.org/v2/everything?q=${team}&pageSize=5&apiKey=${NEWS_API}`;
        let res = null;
        try {
            res = await axios(news, {
                headers: {
                    Accept: 'application/json'
                }
            });
        } catch (err) {
          console.log(err);
        }

        return res.data.articles;
    }
}

export default News;