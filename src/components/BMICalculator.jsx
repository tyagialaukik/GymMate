import React, { useState } from 'react';
import { Ruler, Weight, User, RotateCw, ArrowLeft, Activity } from 'lucide-react';

const BMICalculator = ({ onBack }) => {
    const [height, setHeight] = useState(170); // cm
    const [weight, setWeight] = useState(70); // kg
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('male');

    const calculateBMI = () => {
        const h = height / 100;
        const val = (weight / (h * h)).toFixed(1);
        setBmi(val);

        if (val < 18.5) setCategory({ label: 'Underweight', color: 'var(--color-accent-blue)' });
        else if (val < 25) setCategory({ label: 'Normal Weight', color: 'var(--color-success)' });
        else if (val < 30) setCategory({ label: 'Overweight', color: 'var(--color-warning)' });
        else setCategory({ label: 'Obese', color: 'var(--color-danger)' });
    };

    const reset = () => {
        setBmi(null);
        setCategory('');
    };

    return (
        <div className="bmi-section animate-in">
            <header className="fluid-header-simple">
                <button onClick={onBack} className="btn-ghost back-btn">
                    <ArrowLeft size={20} /> Back
                </button>
                <div className="page-title">
                    <Activity size={18} className="text-accent-pink" />
                    <h2>Biometrics</h2>
                </div>
            </header>

            <div className="fluid-content-container">
                {!bmi ? (
                    <div className="glass-panel input-card">
                        <div className="input-group">
                            <div className="label-row">
                                <label><Ruler size={16} /> Height</label>
                                <span className="value-badge">{height} cm</span>
                            </div>
                            <input
                                type="range" min="120" max="220" value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="fluid-slider"
                                style={{ '--progress': `${((height - 120) / 100) * 100}%` }}
                            />
                        </div>

                        <div className="input-group">
                            <div className="label-row">
                                <label><Weight size={16} /> Weight</label>
                                <span className="value-badge">{weight} kg</span>
                            </div>
                            <input
                                type="range" min="40" max="150" value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="fluid-slider"
                                style={{ '--progress': `${((weight - 40) / 110) * 100}%` }}
                            />
                        </div>

                        <div className="input-group">
                            <label style={{ marginBottom: '12px', display: 'block' }}><User size={16} /> Gender</label>
                            <div className="segmented-control">
                                <button
                                    className={`segment-btn ${gender === 'male' ? 'active' : ''}`}
                                    onClick={() => setGender('male')}
                                >Male</button>
                                <button
                                    className={`segment-btn ${gender === 'female' ? 'active' : ''}`}
                                    onClick={() => setGender('female')}
                                >Female</button>
                                <div className="segment-bg" style={{ transform: gender === 'male' ? 'translateX(0)' : 'translateX(100%)' }}></div>
                            </div>
                        </div>

                        <button className="btn-fluid calculate-btn" onClick={calculateBMI}>
                            Calculate BMI
                        </button>
                    </div>
                ) : (
                    <div className="glass-panel result-card animate-in">
                        <div className="result-header">
                            <h3>Analysis Result</h3>
                            <button className="btn-ghost icon-only" onClick={reset}><RotateCw size={18} /></button>
                        </div>

                        <div className="result-main">
                            <div className="bmi-circle" style={{ borderColor: category.color }}>
                                <span className="bmi-score">{bmi}</span>
                                <span className="bmi-unit">BMI</span>
                            </div>
                            <div className="bmi-text">
                                <h4 style={{ color: category.color }}>{category.label}</h4>
                                <p>Based on your height and weight metrics.</p>
                            </div>
                        </div>

                        <button className="btn-fluid full-width" onClick={reset}>Recalculate</button>
                    </div>
                )}
            </div>

            <style>{`
        .fluid-header-simple { 
            display: flex; align-items: center; justify-content: space-between; 
            margin-bottom: 32px;
        }
        .page-title { display: flex; align-items: center; gap: 8px; color: var(--color-primary); }
        .text-accent-pink { color: var(--color-accent-pink); }
        
        .fluid-content-container { max-width: 500px; margin: 0 auto; }

        .input-card { padding: 32px; background: rgba(0,10,20,0.6); border: 1px solid var(--glass-border); position: relative; }
        .input-card::before { content: ''; position: absolute; top: 0; right: 0; width: 20px; height: 20px; border-top: 2px solid var(--color-primary); border-right: 2px solid var(--color-primary); }
        
        .input-group { margin-bottom: 32px; }
        .label-row { display: flex; justify-content: space-between; margin-bottom: 12px; }
        .label-row label { display: flex; align-items: center; gap: 8px; font-weight: 600; color: var(--color-primary); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .value-badge { font-weight: 700; color: #fff; font-size: 16px; font-family: monospace; }

        /* Fluid Slider Re-mapped to Holo */
        .fluid-slider {
            -webkit-appearance: none; width: 100%; height: 4px;
            background: rgba(255,255,255,0.1);
            border-radius: 0; outline: none; transition: background 0.45s; cursor: pointer;
            box-shadow: 0 0 5px rgba(0, 240, 255, 0.2);
        }
        .fluid-slider::-webkit-slider-thumb {
            -webkit-appearance: none; width: 20px; height: 20px;
            background: var(--color-primary); border-radius: 0;
            box-shadow: 0 0 10px var(--color-primary);
            transition: transform 0.2s;
            cursor: grab;
            clip-path: polygon(20% 0, 100% 0, 80% 100%, 0 100%);
        }
        
        /* Segmented Control */
        .segmented-control {
            display: flex; position: relative;
            background: rgba(0,0,0,0.4); padding: 4px; border: 1px solid var(--glass-border);
        }
        .segment-btn {
            flex: 1; border: none; background: transparent;
            padding: 10px; font-weight: 700; color: var(--text-dim);
            z-index: 2; cursor: pointer; transition: color 0.3s;
            text-transform: uppercase; font-size: 12px;
        }
        .segment-btn.active { color: #fff; }
        
        .segment-bg {
            position: absolute; top: 4px; left: 4px; width: calc(50% - 4px); bottom: 4px;
            background: var(--color-primary);
            box-shadow: 0 0 15px var(--color-primary);
            transition: transform 0.3s var(--ease-spring);
            z-index: 1;
            clip-path: polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
        }

        .calculate-btn { width: 100%; margin-top: 16px; }

        /* Results */
        .result-card { padding: 32px; text-align: center; border: 1px solid var(--color-primary); box-shadow: 0 0 20px rgba(0,240,255,0.2); }
        .result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        
        .result-main { display: flex; flex-direction: column; align-items: center; gap: 24px; margin-bottom: 32px; }
        
        .bmi-circle {
            width: 140px; height: 140px;
            border-radius: 0;
            border: 2px solid;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            position: relative;
            background: rgba(0, 240, 255, 0.05);
            clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
        }
        .bmi-score { font-size: 40px; font-weight: 800; font-family: monospace; }
        .bmi-unit { font-size: 12px; color: var(--text-secondary); font-weight: 700; }
        
        .bmi-text h4 { font-size: 20px; margin-bottom: 8px; letter-spacing: 2px; }
        .bmi-text p { color: var(--text-secondary); font-size: 13px; text-transform: uppercase; }
        
        .full-width { width: 100%; }
        
        @media (prefers-color-scheme: dark) {
            .input-card, .result-card { background: rgba(0,10,20,0.8); }
        }
      `}</style>
        </div>
    );
};

export default BMICalculator;
