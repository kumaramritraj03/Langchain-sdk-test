let MOCK_DB = {
  news: []
};

function getNews() {
  return MOCK_DB.news.length ? MOCK_DB.news.join("\n\n") : "No stored news.";
}

function setNews(news) {
  MOCK_DB.news = [news];
  return "News stored.";
}

function clearNews() {
  MOCK_DB.news = [];
  return "News deleted.";
}

module.exports = { getNews, setNews, clearNews };