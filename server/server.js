import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'https://gym-mate-eight.vercel.app'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '50mb' }));

// --- Mock Database Management ---
const getDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

if (!fs.existsSync(DB_PATH)) {
    saveDB({ users: [], logs: [] });
}

// --- Middleware: Verify JWT ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(status = 401);

    jwt.verify(token, process.env.JWT_SECRET || 'gymmate_secret_123', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, name } = req.body;
    const db = getDB();
    if (db.users.find(u => u.email === email)) return res.status(400).json({ error: "Athlete already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), email, password: hashedPassword, name, avatar: `https://i.pravatar.cc/150?u=${email}` };
    db.users.push(newUser);
    saveDB(db);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || 'gymmate_secret_123');
    res.json({ token, user: { name: newUser.name, email: newUser.email, avatar: newUser.avatar } });
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const db = getDB();
    const user = db.users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'gymmate_secret_123');
    res.json({ token, user: { name: user.name, email: user.email, avatar: user.avatar } });
});

// --- AI PROXY ROUTES ---
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        console.log("[GymMate AI] ✅ Route HIT — /api/chat");
        console.log("[GymMate AI] API Key loaded:", !!process.env.GEMINI_API_KEY);
        console.log("[GymMate AI] API Key value (first 8 chars):", process.env.GEMINI_API_KEY?.slice(0, 8));

        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            throw new Error("GEMINI_API_KEY is not configured.");
        }

        // Extract system prompt and history
        const systemMessage = messages.find(m => m.role === 'system');
        let history = messages
            .filter(m => m.role !== 'system')
            .map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

        // Pop the latest user message — that's what we send via sendMessageStream
        const userMessage = history.pop().parts[0].text;

        // Gemini requires history to start with 'user', never 'model'
        // Drop any leading model messages (e.g. the initial bot greeting)
        while (history.length > 0 && history[0].role === 'model') {
            history.shift();
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash-latest", 
            systemInstruction: systemMessage ? systemMessage.content : "You are GymMate AI — a personal fitness coach."
        });

        const chat = model.startChat({
            history: history,
        });

        // Set headers for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const result = await chat.sendMessageStream(userMessage);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
        }

        res.write('data: [DONE]\n\n');
        res.end();

    } catch (error) {
        console.error("[ERROR] Gemini Chat failure — message:", error.message);
        console.error("[ERROR] Full error:", error);
        // If headers are already sent, we can't send a normal JSON error
        if (!res.headersSent) {
            res.status(500).json({ error: error.message || "Gemini Core Timeout" });
        } else {
            res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
            res.end();
        }
    }
});

app.post('/api/vision', async (req, res) => {
    try {
        console.log("[GymMate AI] Processing Vision Scan (Streaming)...");

        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            throw new Error("GEMINI_API_KEY is not configured.");
        }

        // We expect the frontend to just send the base64 image string and optionally a prompt
        const { imageBase64, prompt } = req.body;

        if (!imageBase64) {
            throw new Error("No image data provided.");
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
            systemInstruction: "You are a GymMate AI nutritional analyzer. You MUST return ONLY valid JSON."
        });

        const defaultPrompt = "Identify the food in this image and provide estimated nutritional data: total calories (number), protein (number), carbs (number), and fats (number). Format the response as JSON with keys: name (string), calories (number), protein (number), carbs (number), fats (number), confidence (number 0-100). Do not use markdown backticks.";

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: "image/jpeg"
            }
        };

        // Set headers for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const result = await model.generateContentStream([prompt || defaultPrompt, imagePart]);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
        }

        res.write('data: [DONE]\n\n');
        res.end();

    } catch (error) {
        console.error("[ERROR] Gemini Vision failure:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message || "Vision Sensor Error" });
        } else {
            res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
            res.end();
        }
    }
});

app.listen(PORT, () => console.log(`[JARVIS] Systems Online at http://localhost:${PORT}`));
