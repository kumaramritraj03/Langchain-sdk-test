const { ChatOpenAI } = require("@langchain/openai");
const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { DynamicTool } = require("@langchain/core/tools");

require("dotenv").config();

// Tools
const fetchNews = require("./tools/newsTool");
const calculator = require("./tools/calculatorTool");
const { getNews, setNews, clearNews } = require("./tools/dbTool");
const getGoldPrice = require("./tools/goldTool");

// LLM
const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0
});

const tools = [
  new DynamicTool({
    name: "get_news",
    description: "Get latest geopolitical news",
    func: async () => {
      const news = await fetchNews();
      setNews(news);
      return news;
    }
  }),
  new DynamicTool({
    name: "calculator",
    description: "Math calculations",
    func: async (input) => calculator(input)
  }),
  new DynamicTool({
    name: "gold_price",
    description: "Gold price",
    func: async () => getGoldPrice()
  }),
  new DynamicTool({
    name: "get_stored_news",
    description: "Get stored news",
    func: async () => getNews()
  }),
  new DynamicTool({
    name: "delete_news",
    description: "Delete news",
    func: async () => clearNews()
  })
];

async function createAgent() {
  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "zero-shot-react-description",
    verbose: true
  });

  return executor;
}

module.exports = createAgent;