/* ═══════════════════════════════════════════════════════════════
   script.js  —  n8n Webhook Chat Bot (Fixed Version)
═══════════════════════════════════════════════════════════════ */

const WEBHOOK_URL = "https://shambhu31.app.n8n.cloud/webhook/chat";

/* ── DOM references ── */
const chatMessages    = document.getElementById("chatMessages");
const userInput       = document.getElementById("userInput");
const sendBtn         = document.getElementById("sendBtn");
const typingIndicator = document.getElementById("typingIndicator");

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  userInput.value = "";
  setLoading(true);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Read as plain TEXT — avoids all JSON parsing errors
    const rawText = await response.text();

    // Try to parse as JSON, fall back to plain text
    let botReply;
    try {
      const data = JSON.parse(rawText);
      botReply = data.output || data.reply || data.text || 
                 data.message || rawText;
    } catch {
      // Not JSON — use raw text directly
      botReply = rawText;
    }

    appendMessage(botReply, "bot");

  } catch (error) {
    console.error("Error:", error);
    appendMessage(`⚠️ ${error.message}`, "bot", true);
  } finally {
    setLoading(false);
  }
}

function appendMessage(text, sender, isError = false) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");

  const bubble = document.createElement("div");
  bubble.classList.add("message-bubble");
  if (isError) bubble.classList.add("error-bubble");
  bubble.textContent = text;

  const time = document.createElement("span");
  time.classList.add("message-time");
  time.textContent = formatTime(new Date());

  msgDiv.appendChild(bubble);
  msgDiv.appendChild(time);
  chatMessages.appendChild(msgDiv);
  scrollToBottom();
}

function setLoading(isLoading) {
  userInput.disabled = isLoading;
  sendBtn.disabled   = isLoading;
  if (isLoading) {
    typingIndicator.classList.add("visible");
    scrollToBottom();
  } else {
    typingIndicator.classList.remove("visible");
    userInput.focus();
  }
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

window.addEventListener("load", () => userInput.focus());

// Warm up the webhook on page load to prevent empty first response
window.addEventListener("load", () => {
  userInput.focus();
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "__warmup__" })
  }).catch(() => {}); // silently ignore warmup response
});