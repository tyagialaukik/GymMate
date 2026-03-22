# GymMate AI 🏋️‍♂️🤖

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

AI-powered fitness platform with real-time coaching, macro scanning, and workout guidance. GymMate AI brings the future of tactical fitness directly to your browser, combining cutting-edge LLMs with a sleek, gamified UI.

**🌐 Live Demo:** [https://gym-mate-eight.vercel.app](https://gym-mate-eight.vercel.app)

---

## ✨ Features

- **JARVIS AI Chat (Streaming)**: Get real-time, token-by-token fitness and diet guidance styled as a tactical AI assistant.
- **Macro Scanner (Gemini Vision)**: Analyze food images via AI to get instant calorie, protein, carb, fat, and fiber breakdowns visually.
- **Workout Library**: Curated weekly routines with dynamic difficulty levels and visual completion tracking.
- **Exercise Guide**: An interactive movement library filtered by muscle groups.
- **Biometrics & BMI**: Dynamic BMI calculator with visual range indicators.
- **JWT Authentication**: Secure user sessions spanning frontend and backend.

---

## 💻 Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React, Vite, React Router (Dynamic UI & Routing) |
| **Backend** | Node.js, Express, JWT, bcryptjs (API & Secure Auth) |
| **AI Integration** | Google Gemini 2.5 Flash (Text & Vision API with SSE streaming) |

---

## 🚀 Getting Started

Follow these instructions to run GymMate AI locally.

### Prerequisites
- Node.js installed (v18+)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository
```bash
git clone https://github.com/tyagialaukik/GymMate.git
cd GymMate
```

### 2. Install Dependencies
Install modules for both the frontend and the backend.
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### 3. Setup Environment Variables
Navigate into the `server` directory and rename or copy `.env.example` to `.env`.
```bash
cd server
cp .env.example .env
```
Inside `.env`, verify your API key and ports:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Locally
You will need to run both the frontend and backend servers.

**Start the Backend Server:**
```bash
cd server
node server.js
```

**Start the Frontend App (in a new terminal):**
```bash
# From the root /GymMate directory
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 📸 Screenshots

### Home Screen
<!-- Add your home screen screenshot here. Example: ![Home Screen](./docs/screenshots/home.png) -->
*(Screenshot placeholder)*

### JARVIS Chat
<!-- Add your chat screenshot here -->
*(Screenshot placeholder)*

### Macro Scanner
<!-- Add your scanner screenshot here -->
*(Screenshot placeholder)*

### Workout Library
<!-- Add your workout library screenshot here -->
*(Screenshot placeholder)*

---

## 👨‍💻 Author
**Alaukik Tyagi**  
SRMIST Ghaziabad, B.Tech CS (2023-2027)
