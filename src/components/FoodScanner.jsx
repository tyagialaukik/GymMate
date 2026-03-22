import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, X, ShieldAlert, Zap, Cpu, Scan, Info, TrendingUp } from 'lucide-react';

const FoodScanner = ({ onBack }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [streamText, setStreamText] = useState('');
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);

    // Initialization: Request Camera Access
    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsStreaming(true);
            }
        } catch (err) {
            setError("Tactical link failed: Camera access denied.");
            console.error(err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    };

    const captureImage = () => {
        if (!canvasRef.current || !videoRef.current) return;
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    };

    const analyzeFood = async () => {

        const base64Image = captureImage();
        if (!base64Image) return;

        setIsAnalyzing(true);
        setStreamText('');
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/api/vision", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    imageBase64: base64Image,
                    prompt: "Identify the food in this image and provide estimated nutritional data. Format the response as ONLY JSON with keys: name (string), calories (number), protein (number), carbs (number), fats (number), fiber (number), confidence (number 0-100). Do not use markdown backticks."
                })
            });

            if (!response.ok) throw new Error("AI Core Connection Refused.");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let content = '';

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
                            content += parsed.text;
                            setStreamText(content);
                        }
                    } catch (e) {
                        // skip malformed chunk
                    }
                }
            }

            // Extract JSON from response (handling potential markdown)
            const jsonStr = content.match(/\{[\s\S]*\}/)[0];
            const result = JSON.parse(jsonStr);
            setScanResult(result);
        } catch (err) {
            console.error(err);
            setError("SCAN ERROR: Unable to process physiological data.");
        } finally {
            setIsAnalyzing(false);
            setStreamText('');
        }
    };

    return (
        <div className="food-scanner animate-in">
            <header className="scanner-header">
                <button onClick={onBack} className="back-btn-ghost"><X size={20} /></button>
                <div className="brand">
                    <Cpu size={16} className="text-primary" />
                    <h3>MACRO SCANNER v1.0</h3>
                </div>
                <div className="spacer"></div>
            </header>

            <div className="viewfinder-container">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="live-preview"
                />

                {/* Holographic HUD Overlay */}
                <div className="scanner-hud">
                    <div className="hud-corners">
                        <div className="corner tl"></div>
                        <div className="corner tr"></div>
                        <div className="corner bl"></div>
                        <div className="corner br"></div>
                    </div>

                    <div className="hud-targeting">
                        <Scan size={40} className={`targeting-icon ${isAnalyzing ? 'scanning' : ''}`} />
                    </div>

                    <div className="hud-readout">
                        <div className={`readout-line ${isAnalyzing ? 'pulse-text' : ''}`}>STATUS: {isAnalyzing ? 'UPLOADING...' : isStreaming ? 'READY' : 'OFFLINE'}</div>
                        <div className="readout-line">SENSORS: {isStreaming ? 'ACTIVE' : 'IDLE'}</div>
                    </div>

                    <div className="hud-glitch-lines"></div>
                    
                    {isAnalyzing && <div className="scanner-sweep-line"></div>}
                </div>

                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            <div className="scanner-controls">
                {error ? (
                    <div className="error-display glass-panel">
                        <ShieldAlert size={20} className="text-accent-pink" />
                        <span>{error}</span>
                        <button className="btn-retry" onClick={startCamera}>RE-INITIALIZE</button>
                    </div>
                ) : scanResult ? (
                    <div className="result-panel glass-panel animate-in">
                        <div className="result-header">
                            <Zap size={20} className="text-primary" />
                            <h4>{scanResult.name.toUpperCase()}</h4>
                            <span className="conf-tag">{scanResult.confidence}% CONFIDENCE</span>
                        </div>
                        <div className="macros-grid">
                            <div className="macro-item">
                                <span className="label">CALORIES</span>
                                <span className="value">{scanResult.calories}</span>
                                <div className="progress-bar"><div className="fill" style={{width: '100%', background: 'var(--color-primary)'}}></div></div>
                            </div>
                            <div className="macro-item">
                                <span className="label">PROTEIN</span>
                                <span className="value">{scanResult.protein}g</span>
                                <div className="progress-bar"><div className="fill" style={{width: Math.min((scanResult.protein / 150) * 100, 100) + '%', background: '#FF3366'}}></div></div>
                            </div>
                            <div className="macro-item">
                                <span className="label">CARBS</span>
                                <span className="value">{scanResult.carbs}g</span>
                                <div className="progress-bar"><div className="fill" style={{width: Math.min((scanResult.carbs / 300) * 100, 100) + '%', background: '#33CCFF'}}></div></div>
                            </div>
                            <div className="macro-item">
                                <span className="label">FATS</span>
                                <span className="value">{scanResult.fats}g</span>
                                <div className="progress-bar"><div className="fill" style={{width: Math.min((scanResult.fats / 80) * 100, 100) + '%', background: '#FFCC00'}}></div></div>
                            </div>
                            <div className="macro-item">
                                <span className="label">FIBER</span>
                                <span className="value">{scanResult.fiber}g</span>
                                <div className="progress-bar"><div className="fill" style={{width: Math.min((scanResult.fiber / 30) * 100, 100) + '%', background: '#33FF99'}}></div></div>
                            </div>
                        </div>
                        <button className="btn-restart" onClick={() => setScanResult(null)}>NEW SCAN</button>
                    </div>
                ) : (
                    <div className="scan-action-area">
                        {isAnalyzing && streamText && (
                            <div className="stream-readout">
                                <span className="stream-text">{streamText.length > 80 ? streamText.slice(-80) + '...' : streamText}</span>
                            </div>
                        )}
                        <button
                            className={`action-btn-scan ${isAnalyzing ? 'busy' : ''}`}
                            onClick={analyzeFood}
                            disabled={isAnalyzing || !isStreaming}
                        >
                            {isAnalyzing ? (
                                <RefreshCw size={24} className="spin" />
                            ) : (
                                <>
                                    <div className="btn-bg"></div>
                                    <Zap size={24} fill="currentColor" />
                                    <span>ANALYZE MACROS</span>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .food-scanner {
                    position: fixed; inset: 0; background: #000;
                    display: flex; flex-direction: column; z-index: 1000;
                }
                
                .scanner-header {
                    padding: 16px; background: rgba(0, 5, 15, 0.9);
                    display: flex; align-items: center; justify-content: space-between;
                    border-bottom: 1px solid var(--color-primary);
                }
                .brand { display: flex; align-items: center; gap: 8px; }
                .brand h3 { font-size: 13px; font-weight: 800; letter-spacing: 2px; color: var(--color-primary); }
                .back-btn-ghost { background: transparent; border: none; color: #fff; cursor: pointer; }

                .viewfinder-container {
                    flex: 1; position: relative; overflow: hidden; background: #050505;
                }
                .live-preview { width: 100%; height: 100%; object-fit: cover; }

                /* HUD STYLES */
                .scanner-hud {
                    position: absolute; inset: 0; pointer-events: none;
                }
                .hud-corners .corner { 
                    position: absolute; width: 40px; height: 40px; 
                    border: 2px solid var(--color-primary); opacity: 0.8;
                    box-shadow: 0 0 10px var(--color-primary), inset 0 0 10px var(--color-primary);
                }
                .tl { top: 40px; left: 40px; border-right: none; border-bottom: none; }
                .tr { top: 40px; right: 40px; border-left: none; border-bottom: none; }
                .bl { bottom: 40px; left: 40px; border-right: none; border-top: none; }
                .br { bottom: 40px; right: 40px; border-left: none; border-top: none; }

                .hud-targeting {
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    color: var(--color-primary); opacity: 0.8;
                }
                .targeting-icon.scanning { animation: scan-pulse 0.5s infinite; }
                @keyframes scan-pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }

                .hud-readout {
                    position: absolute; top: 100px; left: 60px;
                    font-family: monospace; font-size: 10px; color: var(--color-primary);
                    letter-spacing: 1px; line-height: 2; text-shadow: 0 0 5px var(--color-primary);
                }
                .pulse-text { animation: textPulse 1.5s infinite; }
                @keyframes textPulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
                
                .scanner-sweep-line {
                    position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: var(--color-primary); box-shadow: 0 0 15px 2px var(--color-primary);
                    animation: sweep 2s linear infinite; z-index: 5;
                }
                @keyframes sweep {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }

                .scanner-controls {
                    padding: 24px; background: rgba(0, 0, 0, 0.9);
                    display: flex; justify-content: center; min-height: 180px;
                }

                .action-btn-scan {
                    width: 70px; height: 70px; border-radius: 50%; background: var(--color-primary);
                    border: none; color: #000; position: relative; cursor: pointer;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    transition: 0.3s;
                }
                .action-btn-scan span { 
                    position: absolute; top: 80px; width: 150px; 
                    color: var(--color-primary); font-size: 10px; font-weight: 800; 
                    letter-spacing: 2px;
                }
                .action-btn-scan:hover { transform: scale(1.1); box-shadow: 0 0 30px var(--color-primary); }
                .action-btn-scan:disabled { grayscale: 1; opacity: 0.3; }

                .result-panel {
                    width: 100%; max-width: 500px; padding: 24px;
                    background: rgba(0, 240, 255, 0.1); border: 1px solid var(--color-primary);
                }
                .result-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
                .result-header h4 { font-size: 18px; letter-spacing: 1px; flex: 1; }
                .conf-tag { font-size: 9px; font-weight: 800; padding: 4px 8px; border: 1px solid var(--color-primary); color: var(--color-primary); }

                .btn-restart { width: 100%; padding: 12px; background: transparent; border: 1px solid var(--color-primary); color: var(--color-primary); font-weight: 800; font-size: 12px; cursor: pointer; }
                .error-display { color: var(--color-accent-pink); display: flex; flex-direction: column; align-items: center; gap: 12px; }
                .btn-retry { background: var(--color-accent-pink); color: #000; border: none; padding: 8px 16px; font-weight: 800; cursor: pointer; }

                .macros-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 24px; }
                .macro-item { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .macro-item .label { font-size: 8px; color: var(--text-secondary); font-weight: 800; margin-bottom: 4px; }
                .macro-item .value { font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 6px; }
                .progress-bar { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
                .progress-bar .fill { height: 100%; transition: width 0.5s ease-out; }

                .scan-action-area { display: flex; flex-direction: column; align-items: center; gap: 16px; width: 100%; }
                .stream-readout { background: rgba(0, 240, 255, 0.1); padding: 8px 16px; border-radius: 4px; border: 1px solid rgba(0, 240, 255, 0.3); max-width: 300px; text-align: center; }
                .stream-text { font-family: monospace; font-size: 10px; color: var(--color-primary); word-break: break-all; }

                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default FoodScanner;
