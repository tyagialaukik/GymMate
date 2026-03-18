# 🧬 GymMate: AI-Powered Tactical Fitness Companion

GymMate is a premium, full-stack fitness application designed to provide a comprehensive and interactive workout experience. Featuring **JARVIS**, an AI-driven tactical assistant, and an **AI Food Scanner**, GymMate helps athletes track their progress, manage their diet, and follow expert-designed workout plans.

---

## 🚀 Key Features

### 🛠️ Tactical Core (JARVIS AI)
- **Interactive AI Coaching**: Real-time fitness guidance and query handling powered by OpenAI.
- **Visual Intelligence**: AI-powered Food Scanner (OpenAI Vision) for instant nutritional analysis from images.

### 🏋️ Fitness & Training
- **Dynamic Workout Plans**: Specialized tracks for **Beginner**, **Intermediate**, and **Advanced** athletes.
- **Goal-Oriented Pathways**: Choose between **Cutting** or **Bulking** goals.
- **Dietary Flexibility**: Intelligent meal plans for both **Veg** and **Non-Veg** preferences.
- **Exercise Guide**: Detailed instructions and visual cues for various exercises.

### 📊 Performance Tracking
- **BMI Calculator**: Integrated tool to monitor body mass index and health status.
- **Daily Diet Tracker**: Log and monitor your nutritional intake effortlessly.
- **User Dashboard**: Overview of current fitness goals and progress.

### 🔐 Security & Persistence
- **Secure Authentication**: JWT-based signup and login system with bcrypt password hashing.
- **Data Persistence**: Local database (LowDB) for saving user profiles and workout history.

---

## 💻 Tech Stack

- **Frontend**: React (Vite), Lucide-React (Icons), Axios, Custom CSS (Premium Dark Theme).
- **Backend**: Node.js, Express, LowDB, JSON Web Tokens (JWT), Bcryptjs.
- **AI Integration**: OpenAI Chat & Vision APIs.

---

## 🛠️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or later)
- [OpenAI API Key](https://platform.openai.com/api-keys)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd GymMate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `server/` directory and add the following:
```env
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

### 4. Start the Application

**Run Frontend & Backend (Separate terminals required):**

- **Frontend**:
  ```bash
  npm run dev
  ```
- **Backend**:
  ```bash
  node server/server.js
  ```

*Alternatively, run the provided batch script on Windows:*
```bash
run_dev.bat
```

---

## 📁 Project Structure

- `src/components/`: Modular React components for various sections (AI Chat, Food Scanner, BMI, etc.).
- `server/`: Express backend featuring auth routes and AI proxy services.
- `src/assets/`: Static assets and style tokens.

---

## 🛡️ License
This project is for educational/personal use. Please ensure you comply with OpenAI's usage policies when using the AI features.
