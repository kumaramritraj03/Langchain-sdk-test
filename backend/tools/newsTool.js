const axios = require("axios");
require("dotenv").config();

async function fetchNews() {
  const res = await axios.get("https://gnews.io/api/v4/search", {
    params: {
      q: "Israel Iran war",
      lang: "en",
      max: 5,
      apikey: process.env.GNEWS_API_KEY
    }
  });

  const articles = res.data.articles || [];

  return articles.slice(0, 3).map(a =>
    `${a.title}\n${a.description}\nSource: ${a.source.name}`
  ).join("\n\n");
}

module.exports = fetchNews;