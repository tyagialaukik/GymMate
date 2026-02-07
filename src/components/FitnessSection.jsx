import React, { useState } from 'react';
import { Dumbbell, Utensils, Flame, Snowflake, ChevronRight, CornerDownRight, Layers, Target, ArrowLeft, Trophy, Medal, Zap } from 'lucide-react';

const FitnessSection = ({ onNavigate, onBack }) => {
    const [step, setStep] = useState('level'); // 'level', 'goal', 'action'
    const [level, setLevel] = useState(null);
    const [goal, setGoal] = useState(null);

    const handleLevelSelect = (selectedLevel) => {
        setLevel(selectedLevel);
        setStep('goal');
    };

    const handleGoalSelect = (selectedGoal) => {
        setGoal(selectedGoal);
        setStep('action');
    };

    const handleActionSelect = (action) => {
        onNavigate(action, { level, goal });
    };

    const goBack = () => {
        if (step === 'action') setStep('goal');
        else if (step === 'goal') setStep('level');
        else onBack();
    };

    return (
        <div className="fitness-section animate-in">
            <header className="fluid-header-simple">
                <button onClick={goBack} className="btn-ghost back-btn">
                    <ArrowLeft size={20} /> Back
                </button>
                <div className="step-dots">
                    <span className={`dot ${step === 'level' ? 'active' : ''} ${step === 'goal' || step === 'action' ? 'completed' : ''}`}></span>
                    <span className={`dot ${step === 'goal' ? 'active' : ''} ${step === 'action' ? 'completed' : ''}`}></span>
                    <span className={`dot ${step === 'action' ? 'active' : ''}`}></span>
                </div>
            </header>

            <div className="fluid-content-container">
                <div className="header-text">
                    <h2>
                        {step === 'level' && 'Select Difficulty'}
                        {step === 'goal' && 'Choose Your Goal'}
                        {step === 'action' && 'Your Personal Plan'}
                    </h2>
                    <p>
                        {step === 'level' && 'Choose a level that matches your experience.'}
                        {step === 'goal' && 'What do you want to achieve?'}
                        {step === 'action' && 'Ready to start your journey.'}
                    </p>
                </div>

                {step === 'level' && (
                    <div className="bento-grid-col">
                        <LevelCard
                            title="Beginner"
                            sub="Foundation Phase"
                            icon={<Medal size={24} />}
                            color="var(--color-success)"
                            onClick={() => handleLevelSelect('beginner')}
                        />
                        <LevelCard
                            title="Intermediate"
                            sub="Progression Phase"
                            icon={<Trophy size={24} />}
                            color="var(--color-warning)"
                            onClick={() => handleLevelSelect('intermediate')}
                        />
                        <LevelCard
                            title="Advanced"
                            sub="Elite Phase"
                            icon={<Zap size={24} />}
                            color="var(--color-danger)"
                            onClick={() => handleLevelSelect('advanced')}
                        />
                    </div>
                )}

                {step === 'goal' && (
                    <div className="bento-grid-row">
                        <GoalCard
                            title="Bulking"
                            icon={<Flame size={32} />}
                            color="var(--color-warning)"
                            sub="Build Mass & Strength"
                            onClick={() => handleGoalSelect('bulking')}
                        />
                        <GoalCard
                            title="Cutting"
                            icon={<Snowflake size={32} />}
                            color="var(--color-accent-blue)"
                            sub="Lean & Defined"
                            onClick={() => handleGoalSelect('cutting')}
                        />
                    </div>
                )}

                {step === 'action' && (
                    <div className="action-plan animate-in">
                        <div className="glass-panel summary-card">
                            <div className="summary-item">
                                <span className="label">Level</span>
                                <span className="value">{level}</span>
                            </div>
                            <div className="divider-vertical"></div>
                            <div className="summary-item">
                                <span className="label">Goal</span>
                                <span className="value">{goal}</span>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button className="glass-card big-action-btn" onClick={() => handleActionSelect('workout')}>
                                <div className="icon-circle blue-circle">
                                    <Dumbbell size={24} />
                                </div>
                                <div className="btn-text">
                                    <h3>Workout Routine</h3>
                                    <p>View your training schedule</p>
                                </div>
                                <ChevronRight size={20} className="arrow" />
                            </button>

                            <button className="glass-card big-action-btn" onClick={() => handleActionSelect('diet')}>
                                <div className="icon-circle purple-circle">
                                    <Utensils size={24} />
                                </div>
                                <div className="btn-text">
                                    <h3>Nutrition Plan</h3>
                                    <p>View your meal tracking</p>
                                </div>
                                <ChevronRight size={20} className="arrow" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .fluid-header-simple { 
            display: flex; align-items: center; justify-content: space-between; 
            margin-bottom: 32px;
        }

        .step-dots { display: flex; gap: 8px; }
        .dot { 
            width: 8px; height: 8px; border-radius: 0; 
            background: var(--glass-border); transition: all 0.3s;
        }
        .dot.active { background: var(--color-primary); box-shadow: 0 0 10px var(--color-primary); }
        .dot.completed { background: var(--color-primary); opacity: 0.5; }

        .header-text { margin-bottom: 32px; text-align: center; }
        .header-text h2 { font-size: 22px; margin-bottom: 8px; color: #fff; letter-spacing: 2px; }
        .header-text p { color: var(--text-secondary); font-size: 13px; text-transform: uppercase; }

        .fluid-content-container { max-width: 500px; margin: 0 auto; }

        /* Level Cards */
        .bento-grid-col { display: flex; flex-direction: column; gap: 16px; }
        
        .level-card {
            background: rgba(0, 10, 20, 0.6);
            border: 1px solid var(--glass-border);
            padding: 24px;
            display: flex; align-items: center; gap: 20px;
            border-radius: var(--radius-sm);
            cursor: pointer; transition: all 0.3s;
            text-align: left;
            position: relative;
        }
        .level-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: currentColor; box-shadow: 2px 0 10px currentColor; }
        
        .level-card:hover {
            border-color: var(--color-primary);
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
            transform: translateX(4px);
        }

        .level-icon {
            width: 56px; height: 56px; border-radius: 0;
            display: flex; align-items: center; justify-content: center;
            background: rgba(255,255,255,0.05);
            color: var(--color-primary);
        }
        
        .level-info h3 { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 2px; letter-spacing: 1px; }
        .level-info p { font-size: 11px; color: var(--text-secondary); text-transform: uppercase; }

        /* Goal Cards */
        .bento-grid-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        
        .goal-card {
            background: rgba(0, 10, 20, 0.7);
            border: 1px solid var(--glass-border);
            padding: 32px 16px;
            display: flex; flex-direction: column; align-items: center; text-align: center;
            border-radius: var(--radius-sm);
            cursor: pointer; transition: all 0.3s;
        }
        .goal-card:hover { 
            border-color: var(--color-primary);
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
            transform: translateY(-4px);
        }
        
        .goal-icon {
            margin-bottom: 16px;
            filter: drop-shadow(0 0 8px currentColor);
            transition: transform 0.3s;
        }
        
        .goal-card h3 { margin-bottom: 4px; color: #fff; font-size: 16px; letter-spacing: 1px; }
        .goal-card p { font-size: 10px; color: var(--text-secondary); text-transform: uppercase; }

        /* Action Step */
        .summary-card {
            display: flex; justify-content: space-around; align-items: center;
            padding: 24px; border-radius: 0; margin-bottom: 32px;
            background: rgba(0, 240, 255, 0.05);
            border: 1px solid var(--color-primary);
        }
        .summary-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .summary-item .label { font-size: 9px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 2px; }
        .summary-item .value { font-size: 18px; font-weight: 800; color: #fff; text-transform: uppercase; font-family: monospace; }
        
        .divider-vertical { width: 1px; height: 40px; background: var(--color-primary); opacity: 0.3; }

        .action-buttons { display: flex; flex-direction: column; gap: 16px; }
        
        .big-action-btn {
            display: flex; align-items: center; gap: 20px;
            padding: 20px; border-radius: 0;
            background: rgba(0,10,20,0.6);
            border: 1px solid var(--glass-border);
            transition: all 0.3s; text-align: left;
            width: 100%;
        }
        .big-action-btn:hover {
            border-color: var(--color-primary);
            box-shadow: 0 0 20px rgba(0,240,255,0.15);
            transform: scale(1.02);
        }
        
        .icon-circle {
            width: 48px; height: 48px; border-radius: 0;
            display: flex; align-items: center; justify-content: center;
            color: #000; flex-shrink: 0;
            box-shadow: 0 0 10px currentColor;
        }
        .blue-circle { background: var(--color-primary); }
        .purple-circle { background: var(--color-accent-purple); }
        
        .btn-text { flex: 1; }
        .btn-text h3 { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 2px; letter-spacing: 1px; }
        .btn-text p { font-size: 11px; color: var(--text-secondary); text-transform: uppercase; }
        
        .arrow { color: var(--color-primary); }
        
        @media (prefers-color-scheme: dark) {
            .level-card, .goal-card, .big-action-btn { background: rgba(0,10,20,0.8); }
        }
      `}</style>
        </div>
    );
};

const LevelCard = ({ title, sub, icon, color, onClick }) => (
    <button className="level-card" onClick={onClick}>
        <div className="level-icon" style={{ color: color }}>
            {icon}
        </div>
        <div className="level-info">
            <h3>{title}</h3>
            <p>{sub}</p>
        </div>
        <ChevronRight size={20} className="arrow" style={{ marginLeft: 'auto', opacity: 0.5 }} />
    </button>
);

const GoalCard = ({ title, icon, color, sub, onClick }) => (
    <button className="goal-card" onClick={onClick}>
        <div className="goal-icon" style={{ color: color }}>
            {icon}
        </div>
        <div>
            <h3>{title}</h3>
            <p>{sub}</p>
        </div>
    </button>
);

export default FitnessSection;
