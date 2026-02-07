import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
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
        console.log("[JARVIS] Processing Chat Request...");
        const response = await axios.post("https://api.openai.com/v1/chat/completions", req.body, {
            headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error("[ERROR] OpenAI Chat failure:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data?.error?.message || "Tactical Core Timeout" });
    }
});

app.post('/api/vision', async (req, res) => {
    try {
        console.log("[JARVIS] Processing Vision Scan...");
        const response = await axios.post("https://api.openai.com/v1/chat/completions", req.body, {
            headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error("[ERROR] OpenAI Vision failure:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data?.error?.message || "Vision Sensor Error" });
    }
});

app.listen(PORT, () => console.log(`[JARVIS] Systems Online at http://localhost:${PORT}`));
