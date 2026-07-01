# kartik117.github.io — Personal Portfolio

[![Deploy](https://github.com/kartik117/kartik117.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/kartik117/kartik117.github.io/actions/workflows/deploy.yml)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)
![GitHub Pages](https://img.shields.io/badge/Hosted-GitHub%20Pages-black?logo=github)

My personal portfolio site — built with React + Vite, React Router, and Framer Motion. Live at [kartik117.github.io](https://kartik117.github.io).

---

## 🌐 Live Site

**[kartik117.github.io](https://kartik117.github.io)**

---

## ✨ Features

- ⚡ **Fast** — Vite build with code-splitting, deployed to GitHub Pages via GitHub Actions
- 🎨 **Apple dark design system** — `#000` background, `#0a7cff` accent, glassmorphic cards with `backdrop-filter: blur`
- 🎞️ **Framer Motion animations** — page transitions, scroll-triggered reveals, staggered lists
- 📱 **Fully responsive** — mobile-first layout across all pages
- 🤖 **AI chat widget** — floating assistant powered by Groq (Llama 3.3-70b) via FastAPI backend on Render
- 🔍 **Filterable project catalog** — filter by Backend, Full-Stack, AI/ML categories

---

## 📄 Pages

- **Home** — intro, impact stats, featured projects
- **About** — bio, education, work experience timeline, skills, certifications
- **Portfolio** — every project I've shipped, filterable by category, linked to its real GitHub repo
- **Contact** — email, location, GitHub

---

## 🧰 Tech Stack

### Frontend
- `React 19` + `React Router` for routing
- `Framer Motion` for animations
- `Vite 6` for bundling
- Pure CSS with Apple-inspired design tokens (no CSS framework)

### AI Chat Widget
- **Frontend:** floating bubble component (`src/components/ChatWidget/`) — sends last 12 messages as history
- **Backend:** FastAPI + Groq Python SDK (`llama-3.3-70b-versatile`) in `chat-backend/`
- **Approach:** context injection — full resume baked into system prompt (no RAG needed at this scale)
- **Deploy:** backend on Render free tier, URL injected at Vite build time via `VITE_CHAT_API_URL`

---

## 🛠 Running Locally

```bash
npm install
npm run dev
```

For the AI chat widget, also start the backend:

```bash
cd chat-backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # add GROQ_API_KEY from console.groq.com/keys
uvicorn main:app --reload
```

---

## 🚀 Deploying

### Frontend → GitHub Pages

Push to `main` — GitHub Actions builds and deploys automatically.

```bash
# or trigger manually
git push origin main
```

### Chat Backend → Render

1. New Web Service → connect this repo
2. **Root Directory:** `chat-backend`
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add env var: `GROQ_API_KEY`

Then add `VITE_CHAT_API_URL` as a GitHub Actions repository variable (Settings → Secrets and variables → Actions → Variables) and re-run the deploy workflow.

---

## 🔐 Environment Variables

| Variable | Where | Description |
|---|---|---|
| `GROQ_API_KEY` | Render (backend) | Groq API key for the chat backend |
| `VITE_CHAT_API_URL` | GitHub Actions variable | Render backend URL, baked into Vite build |

---

## 📁 Project Structure

```
kartik117.github.io/
├── src/
│   ├── components/
│   │   ├── ChatWidget/     # Floating AI chat assistant
│   │   ├── Portfolio/      # /portfolio catalog page
│   │   ├── About/          # /about page
│   │   ├── Home/           # Home page sections
│   │   └── ...
│   ├── App.jsx
│   └── main.jsx
├── chat-backend/           # FastAPI chat API
│   ├── main.py
│   └── requirements.txt
├── public/images/          # Project screenshots
└── .github/workflows/
    └── deploy.yml          # GitHub Actions CI/CD
```

---

## 👨‍💻 About

**Kartik Bamble** — AI/ML Engineer & Full-Stack Developer  
M.S. Computer Science, Syracuse University (May 2026) · Redmond, WA

🔗 [LinkedIn](https://linkedin.com/in/kartikbamble) · [GitHub](https://github.com/kartik117)

---

## License

MIT
