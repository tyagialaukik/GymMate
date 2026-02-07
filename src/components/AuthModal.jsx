import React, { useState } from 'react';
import { X, Mail, Lock, Sparkles, Chrome, ChevronRight, UserCheck } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [view, setView] = useState('picker'); // 'picker' or 'form'
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const googleSuggestions = [
        { name: "John Athlete", email: "john.fit@gmail.com", avatar: "https://i.pravatar.cc/150?u=john" },
        { name: "Sarah Power", email: "sarah.strong@gmail.com", avatar: "https://i.pravatar.cc/150?u=sarah" }
    ];

    const handleGoogleLogin = async (userData) => {
        setIsLoggingIn(true);
        try {
            // In a real app, this would be a Google OAuth token verification.
            // For now, we'll use our backend signup/login bridge.
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: userData.email,
                    password: "password123", // Simulated passkey for demo
                    name: userData.name
                })
            });

            const data = await response.json();

            // If user already exists, try login
            if (!response.ok) {
                const loginRes = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: userData.email,
                        password: "password123"
                    })
                });
                const loginData = await loginRes.json();
                if (!loginRes.ok) throw new Error(loginData.error);

                localStorage.setItem('gymmate_token', loginData.token);
                onLoginSuccess(loginData.user);
            } else {
                localStorage.setItem('gymmate_token', data.token);
                onLoginSuccess(data.user);
            }

            onClose();
        } catch (err) {
            alert("Tactical Auth Failed: " + err.message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="auth-overlay animate-in" onClick={onClose}>
            <div className="auth-modal bento-item" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}><X size={20} /></button>

                <div className="auth-header">
                    <div className="auth-icon-bubble">
                        <Lock size={24} className="text-primary" />
                    </div>
                    <h2>Tactical Access</h2>
                    <p>Initialize secure session protocol</p>
                </div>

                <div className="auth-content">
                    {isLoggingIn ? (
                        <div className="loading-state">
                            <div className="loader"></div>
                            <p>Establishing Secure Link...</p>
                        </div>
                    ) : (
                        <>
                            {view === 'picker' ? (
                                <div className="google-flow">
                                    <button className="btn-google" onClick={() => setView('form')}>
                                        <Chrome size={20} />
                                        <span>Sign in with Google</span>
                                    </button>

                                    <div className="suggestions-divider">
                                        <span>Continue as</span>
                                    </div>

                                    <div className="suggestions-list">
                                        {googleSuggestions.map(user => (
                                            <div key={user.email} className="suggestion-item" onClick={() => handleGoogleLogin(user)}>
                                                <img src={user.avatar} alt="avatar" />
                                                <div className="sug-text">
                                                    <span className="sug-name">{user.name}</span>
                                                    <span className="sug-email">{user.email}</span>
                                                </div>
                                                <ChevronRight size={16} className="sug-arrow" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="auth-footer-links">
                                        <button onClick={() => setView('form')}>Use another account</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="manual-form animate-in">
                                    <div className="input-group">
                                        <Mail size={16} />
                                        <input type="email" placeholder="ATHLETE IDENTIFIER (EMAIL)" />
                                    </div>
                                    <div className="input-group">
                                        <Lock size={16} />
                                        <input type="password" placeholder="SECURITY PASSKEY" />
                                    </div>
                                    <button className="btn-auth-primary" onClick={() => handleGoogleLogin(googleSuggestions[0])}>
                                        <UserCheck size={18} /> INITIALIZE SESSION
                                    </button>
                                    <button className="btn-back-link" onClick={() => setView('picker')}>Back to secure options</button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="modal-footer-decor">
                    <div className="line"></div>
                    <Sparkles size={12} className="text-primary" />
                    <div className="line"></div>
                </div>
            </div>

            <style>{`
                .auth-overlay {
                    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
                    z-index: 5000; display: flex; align-items: center; justify-content: center;
                    backdrop-filter: blur(10px); padding: 20px;
                }
                .auth-modal {
                    width: 100%; max-width: 420px; padding: 40px;
                    background: rgba(0, 5, 15, 0.95); border: 1px solid var(--color-primary);
                    position: relative; box-shadow: 0 0 50px rgba(0, 240, 255, 0.2);
                }
                .close-btn { position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: #fff; cursor: pointer; opacity: 0.5; }
                .close-btn:hover { opacity: 1; color: var(--color-primary); }

                .auth-header { text-align: center; margin-bottom: 32px; }
                .auth-icon-bubble { 
                    width: 64px; height: 64px; background: rgba(0, 240, 255, 0.1); 
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 16px; border: 1px solid var(--color-primary);
                    box-shadow: 0 0 20px var(--color-primary);
                }
                .auth-header h2 { font-size: 24px; letter-spacing: 2px; margin-bottom: 4px; }
                .auth-header p { font-size: 11px; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 1px; }

                .btn-google {
                    width: 100%; padding: 14px; background: #fff; color: #000;
                    border: none; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 12px;
                    border-radius: 4px; cursor: pointer; transition: 0.2s;
                }
                .btn-google:hover { transform: scale(1.02); }

                .suggestions-divider { 
                    display: flex; align-items: center; gap: 12px; margin: 24px 0;
                    font-size: 10px; text-transform: uppercase; color: var(--text-secondary); font-weight: 700;
                }
                .suggestions-divider::before, .suggestions-divider::after { content: ''; flex: 1; height: 1px; background: var(--glass-border); }

                .suggestions-list { display: flex; flex-direction: column; gap: 12px; }
                .suggestion-item {
                    display: flex; align-items: center; gap: 12px; padding: 12px;
                    background: rgba(255, 255, 255, 0.05); border: 1px solid var(--glass-border);
                    cursor: pointer; transition: 0.2s;
                }
                .suggestion-item:hover { border-color: var(--color-primary); background: rgba(0, 240, 255, 0.05); }
                .suggestion-item img { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--color-primary); }
                .sug-text { flex: 1; display: flex; flex-direction: column; }
                .sug-name { font-size: 13px; font-weight: 700; color: #fff; }
                .sug-email { font-size: 11px; color: var(--text-secondary); }
                .sug-arrow { opacity: 0.3; }

                .input-group {
                    display: flex; align-items: center; gap: 12px; padding: 14px;
                    background: rgba(0, 0, 0, 0.5); border: 1px solid var(--glass-border);
                    margin-bottom: 16px;
                }
                .input-group input { flex: 1; background: transparent; border: none; outline: none; color: #fff; font-family: 'Rajdhani', sans-serif; }
                
                .btn-auth-primary {
                    width: 100%; padding: 16px; background: var(--color-primary); color: #000;
                    border: none; font-weight: 800; letter-spacing: 1px; cursor: pointer;
                    margin-top: 8px; transition: 0.3s;
                }
                .btn-auth-primary:hover { box-shadow: 0 0 30px var(--color-primary); transform: scale(1.02); }
                
                .btn-back-link, .auth-footer-links button {
                    background: transparent; border: none; color: var(--color-primary);
                    font-size: 11px; font-weight: 700; text-transform: uppercase;
                    margin-top: 16px; cursor: pointer; width: 100%; padding: 10px;
                }

                .modal-footer-decor { display: flex; align-items: center; gap: 16px; margin-top: 32px; opacity: 0.5; }
                .modal-footer-decor .line { flex: 1; height: 1px; background: var(--color-primary); }

                .loading-state { text-align: center; padding: 40px 0; }
                .loader { 
                    width: 40px; height: 40px; border: 3px solid rgba(0, 240, 255, 0.1); 
                    border-top-color: var(--color-primary); border-radius: 50%;
                    margin: 0 auto 16px; animation: spin 1s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AuthModal;
