const express = require("express");
const cors = require("cors");
const path = require("path");
const createAgent = require("./agent");

const app = express();
app.use(cors());
app.use(express.json());

let agent;

(async () => {
  agent = await createAgent();
  console.log("✅ Agent ready");
})();

// 🔥 API route
app.post("/chat", async (req, res) => {
  const input = req.body.message;

  try {
    const result = await agent.invoke({
      input
    });

    res.json({ response: result.output });

  } catch (err) {
    console.error(err);
    res.json({ response: "Error processing request" });
  }
});

// 🔥 Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// 🔥 Default route → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});