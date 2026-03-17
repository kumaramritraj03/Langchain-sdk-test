const chat = document.getElementById("chat");

// ✅ Show welcome message on load
window.onload = () => {
  addAIMessage(`
👋 Hello! I am your Financial & Geopolitical AI Assistant.

You can ask things like:
`);

  addSuggestion("Latest Israel Iran news");
  addSuggestion("Refresh news");
  addSuggestion("Gold price");
  addSuggestion("Calculate 2150 * 3");
  addSuggestion("Delete news");
};

// 🧠 Send message
async function send(text = null) {

  const inputBox = document.getElementById("input");
  const message = text || inputBox.value;

  if (!message) return;

  addUserMessage(message);
  inputBox.value = "";

  const res = await fetch("/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  addAIMessage(data.response);
}

// 💬 UI helpers

function addUserMessage(msg) {
  chat.innerHTML += `<p class="user"><b>You:</b> ${msg}</p>`;
}

function addAIMessage(msg) {
  chat.innerHTML += `<p class="ai"><b>AI:</b> ${msg}</p>`;
}

// 🟦 Clickable suggestions
function addSuggestion(text) {
  chat.innerHTML += `
    <div class="suggestion" onclick="send('${text}')">
      ${text}
    </div>
  `;
}