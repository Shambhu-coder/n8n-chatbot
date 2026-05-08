# 🤖 n8n AI Chatbot

A lightweight AI chatbot frontend built with **HTML, CSS & JavaScript**, powered by an **n8n webhook** as the backend brain — deployed live on **Netlify**.

🔗 **Live Demo:** [https://moonlit-elf-f149bd.netlify.app/](https://moonlit-elf-f149bd.netlify.app/)

---

## ✨ Features

- 💬 Real-time chat UI with typing indicator
- ⚡ Connected to n8n workflow via webhook
- 🧠 AI-powered responses (via n8n + any AI node like OpenAI, Claude, etc.)
- 📱 Fully responsive — works on mobile & desktop
- 🚀 Zero backend code — pure HTML/CSS/JS frontend
- 🔁 Webhook warmup on page load for faster first response
- ⌨️ Send messages via Enter key or click

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| AI Backend | [n8n](https://n8n.io) workflow with webhook trigger |
| Deployment | [Netlify](https://netlify.com) |

---

## 📁 Project Structure

```
n8n-chatbot/
├── index.html      # Chat UI layout
├── style.css       # Styling & animations
└── script.js       # Webhook communication logic
```

---

## 🚀 Deploy Your Own

### 1. Fork / Clone this repo

```bash
git clone https://github.com/YOUR_USERNAME/n8n-chatbot.git
cd n8n-chatbot
```

### 2. Set up your n8n Webhook

1. Go to [n8n.io](https://n8n.io) — sign up or self-host
2. Create a new workflow
3. Add a **Webhook** node as the trigger
4. Set method to `POST`
5. Add your AI node (OpenAI, Claude, Gemini, etc.)
6. Connect the AI response back to a **Respond to Webhook** node
7. **Activate** the workflow and copy the webhook URL

### 3. Update the Webhook URL

Open `script.js` and replace the webhook URL with your own:

```js
// script.js — Line 5
const WEBHOOK_URL = "https://YOUR-N8N-INSTANCE.app.n8n.cloud/webhook/YOUR-PATH";
```

### 4. Deploy to Netlify

**Option A — Netlify UI (easiest):**
1. Go to [netlify.com](https://netlify.com) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repo
4. No build settings needed — just click **Deploy**

**Option B — Drag & Drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your project folder directly — done!

---

## ⚙️ How It Works

```
User types message
      ↓
script.js sends POST request to n8n webhook
      ↓
n8n workflow processes the message (AI node)
      ↓
n8n responds with AI reply (JSON or plain text)
      ↓
Chat UI displays the bot response
```

The frontend handles both **JSON** and **plain text** responses from n8n automatically:

```js
// Supports: { output }, { reply }, { text }, { message }, or raw text
botReply = data.output || data.reply || data.text || data.message || rawText;
```

---

## 🔧 Customization

**Change the bot name:**
Edit the header in `index.html`:
```html
<span class="header-title">Your Bot Name</span>
```

**Change the welcome message:**
Edit the first bot message in `index.html`:
```html
<div class="message-bubble">
  Your custom welcome message here 👋
</div>
```

**Change colors/theme:**
Edit CSS variables in `style.css` to match your brand.

---

## 📌 Notes

- Make sure your n8n webhook is **active** (not just saved) before testing
- The frontend sends a silent `__warmup__` POST on page load to wake up the webhook and reduce first-response delay
- For production, consider adding CORS headers in your n8n webhook settings

---

## 📄 License

MIT — free to use, modify, and deploy.

---

## 🙋 Author

Built by **Shambhu** — powered by n8n automation + Netlify hosting.