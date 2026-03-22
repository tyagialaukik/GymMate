import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Cpu, Terminal } from 'lucide-react';
import API_BASE_URL from '../config';

const AIChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: "Tactical Assistant JARVIS online. I am now connected to my global knowledge core. How shall we optimize your results today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        const currentInput = input;
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Add an empty bot message that we'll stream into
        const botMsgId = Date.now() + 1;
        setMessages(prev => [...prev, { id: botMsgId, type: 'bot', text: '' }]);

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content: "You are GymMate AI — a personal fitness coach. Help users with workout plans, nutrition, exercise form, and motivation. Be energetic and practical. Use bullet points for plans."
                        },
                        ...messages.map(m => ({
                            role: m.type === 'bot' ? 'assistant' : 'user',
                            content: m.text
                        })),
                        { role: "user", content: currentInput }
                    ]
                })
            });

            console.log("[AIChat] Response status:", response.status, response.statusText);
            if (!response.ok) {
                const errBody = await response.text();
                console.error("[AIChat] Server error body:", errBody);
                throw new Error(`Server error ${response.status}: ${errBody}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            setIsTyping(false);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop(); // keep incomplete line in buffer

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;
                    const payload = line.slice(6).trim();
                    if (payload === '[DONE]') break;

                    try {
                        const parsed = JSON.parse(payload);
                        if (parsed.error) throw new Error(parsed.error);
                        if (parsed.text) {
                            setMessages(prev => prev.map(m =>
                                m.id === botMsgId
                                    ? { ...m, text: m.text + parsed.text }
                                    : m
                            ));
                        }
                    } catch (e) {
                        // skip malformed chunk
                    }
                }
            }
        } catch (error) {
            console.error("[AIChat] ❌ Caught error:", error.message, error);
            setIsTyping(false);
            setMessages(prev => prev.map(m =>
                m.id === botMsgId
                    ? { ...m, text: "⚠️ GymMate AI is offline or the API key is not configured. Please try again." }
                    : m
            ));
        } finally {
            setIsTyping(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="floating-chat-overlay">
            <div className="ai-chat-window glass-panel animate-in">
                <header className="chat-window-header">
                    <div className="header-brand">
                        <Cpu size={16} className="text-primary" />
                        <h3>JARVIS TACTICAL</h3>
                    </div>
                    <button onClick={onClose} className="close-btn"><X size={18} /></button>
                </header>

                <div className="chat-messages" ref={scrollRef}>
                    {messages.map(msg => (
                        <div key={msg.id} className={`msg-row ${msg.type}`}>
                            <div className="msg-bubble">
                                <p>{msg.text}</p>
                                <div className="decor-line"></div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="msg-row bot">
                            <div className="msg-bubble typing">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="chat-footer">
                    <div className="terminal-input">
                        <Terminal size={14} className="term-icon" />
                        <input
                            type="text"
                            placeholder="Consult Tactical Core..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="send-action" onClick={handleSend} disabled={isTyping}><Send size={16} /></button>
                    </div>
                </div>
            </div>

            <style>{`
                .floating-chat-overlay {
                    position: fixed; bottom: 90px; right: 30px;
                    width: 400px; height: 550px; z-index: 1000;
                    display: flex; flex-direction: column;
                }
                
                .ai-chat-window {
                    flex: 1; display: flex; flex-direction: column;
                    background: rgba(0, 5, 15, 0.95);
                    border: 1px solid var(--color-primary);
                    box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
                    overflow: hidden; border-radius: 4px;
                }
                
                .chat-window-header {
                    padding: 12px 16px; background: rgba(0, 240, 255, 0.1);
                    display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
                }
                .header-brand { display: flex; align-items: center; gap: 8px; }
                .header-brand h3 { font-size: 13px; font-weight: 800; letter-spacing: 2px; color: var(--color-primary); }
                .close-btn { background: transparent; border: none; color: #fff; cursor: pointer; opacity: 0.6; transition: 0.2s; }
                .close-btn:hover { opacity: 1; color: var(--color-primary); }

                .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
                .chat-messages::-webkit-scrollbar { width: 4px; }
                .chat-messages::-webkit-scrollbar-thumb { background: var(--color-primary); }

                .msg-row { display: flex; max-width: 90%; }
                .msg-row.bot { align-self: flex-start; }
                .msg-row.user { align-self: flex-end; }

                .msg-bubble {
                    padding: 10px 14px; background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 13px; line-height: 1.4; color: #ddd;
                    position: relative; white-space: pre-wrap;
                }
                .bot .msg-bubble { border-left: 2px solid var(--color-primary); }
                .user .msg-bubble { background: rgba(188, 19, 254, 0.1); border-color: rgba(188, 19, 254, 0.3); color: #fff; }

                .typing { display: flex; gap: 4px; padding: 10px 15px; }
                .typing span { width: 5px; height: 5px; background: var(--color-primary); border-radius: 50%; animation: blink 1s infinite; }
                .typing span:nth-child(2) { animation-delay: 0.2s; }
                .typing span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

                .chat-footer { padding: 12px; background: rgba(0, 0, 0, 0.5); }
                .terminal-input {
                    display: flex; align-items: center; gap: 10px;
                    background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 8px 12px;
                }
                .term-icon { color: var(--color-primary); opacity: 0.7; }
                .terminal-input input {
                    flex: 1; background: transparent; border: none; outline: none;
                    color: #fff; font-family: monospace; font-size: 13px;
                }
                .send-action { background: transparent; border: none; color: var(--color-primary); cursor: pointer; display: flex; align-items: center; }
                .send-action:disabled { opacity: 0.3; cursor: not-allowed; }
                .send-action:hover:not(:disabled) { color: #fff; transform: scale(1.1); }

                @media (max-width: 480px) {
                    .floating-chat-overlay { width: calc(100% - 40px); bottom: 80px; left: 20px; right: 20px; height: 450px; }
                }
            `}</style>
        </div>
    );
};

export default AIChat;
