import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Clock, Battery, Calendar, ArrowLeft, Hexagon, Activity, ChevronRight } from 'lucide-react';
import { WORKOUT_PLANS } from '../data/plans';

const WorkoutSection = ({ onBack, context }) => {
    const { level = 'beginner', goal = 'bulking' } = context || {};
    const plan = WORKOUT_PLANS[level]?.[goal] || WORKOUT_PLANS['beginner']['bulking'];

    const [selectedDay, setSelectedDay] = useState(1);
    const totalDays = plan.days.length;

    const currentRoutine = plan.days[selectedDay - 1] || plan.days[0];
    const [exercises, setExercises] = useState(currentRoutine.exercises);

    useEffect(() => {
        setExercises(currentRoutine.exercises);
    }, [selectedDay, currentRoutine]);

    const toggleComplete = (id) => {
        setExercises(prev => prev.map(ex =>
            ex.id === id ? { ...ex, completed: !ex.completed } : ex
        ));
    };

    return (
        <div className="workout-section animate-in">
            <header className="fluid-header-simple">
                <button onClick={onBack} className="btn-ghost back-btn">
                    <ArrowLeft size={20} /> Back
                </button>
                <div className="page-title">
                    <Activity size={18} className="text-accent-blue" />
                    <h2>Training Protocol</h2>
                </div>
            </header>

            <div className="fluid-content-container">
                {/* Profile Indicator */}
                <div className="profile-indicator">
                    <span className="pill">{level}</span>
                    <span className="pill">{goal}</span>
                </div>

                {/* Day Selector */}
                <div className="calendar-strip">
                    {plan.days.map((day, i) => (
                        <button
                            key={i}
                            className={`day-pill ${selectedDay === i + 1 ? 'active' : ''}`}
                            onClick={() => setSelectedDay(i + 1)}
                        >
                            <span className="day-label">Session</span>
                            <span className="day-number">{i + 1}</span>
                        </button>
                    ))}
                </div>

                <div className="day-summary">
                    <div className="text-content">
                        <h3>{currentRoutine.name}</h3>
                        <p>{exercises.length} Exercises Protocol</p>
                    </div>
                </div>

                <div className="exercise-list">
                    {exercises.map(ex => (
                        <div key={ex.id} className={`glass-card exercise-item ${ex.completed ? 'completed' : ''}`}>
                            <div className="item-left">
                                <div className="ex-icon">
                                    {ex.completed ? <CheckCircle size={20} className="text-success" /> : <div className="circle-placeholder"></div>}
                                </div>
                                <div className="ex-info">
                                    <h4>{ex.name}</h4>
                                    <p>{ex.sets} Sets x {ex.reps} • {ex.muscle}</p>
                                </div>
                            </div>

                            <button
                                className={`btn-icon ${ex.completed ? 'btn-success' : 'btn-primary'}`}
                                onClick={() => toggleComplete(ex.id)}
                            >
                                {ex.completed ? <CheckCircle size={20} /> : <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .fluid-header-simple { 
            display: flex; align-items: center; justify-content: space-between; 
            margin-bottom: 24px;
        }
        .page-title { display: flex; align-items: center; gap: 8px; color: var(--color-primary); }
        .text-accent-blue { color: var(--color-primary); }

        .fluid-content-container { max-width: 500px; margin: 0 auto; }

        .profile-indicator { display: flex; gap: 8px; margin-bottom: 24px; }
        .profile-indicator .pill { 
            font-size: 10px; font-weight: 700; text-transform: uppercase; 
            color: var(--color-primary); background: rgba(0,240,255,0.1); 
            padding: 4px 10px; border: 1px solid rgba(0,240,255,0.2);
        }

        /* Calendar Strip */
        .calendar-strip {
            display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 24px;
            scroll-behavior: smooth;
        }
        .calendar-strip::-webkit-scrollbar { display: none; }
        
        .day-pill {
            flex: 0 0 auto;
            border: 1px solid var(--glass-border);
            border-radius: 0;
            min-width: 65px; height: 64px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            background: rgba(0, 10, 20, 0.6);
            cursor: pointer; transition: all 0.3s;
            position: relative;
        }
        .day-pill.active {
            background: var(--color-primary);
            color: #000;
            border-color: var(--color-primary);
            box-shadow: 0 0 15px var(--color-primary);
            transform: translateY(-2px);
        }
        .day-pill.active::after {
            content: ''; position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
            border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid var(--color-primary);
        }
        
        .day-label { font-size: 8px; text-transform: uppercase; font-weight: 700; opacity: 0.8; letter-spacing: 1px; }
        .day-number { font-size: 18px; font-weight: 800; line-height: 1.2; font-family: monospace; }

        .day-summary { margin-bottom: 20px; border-left: 4px solid var(--color-primary); padding-left: 16px; }
        .day-summary h3 { font-size: 18px; margin-bottom: 2px; color: #fff; letter-spacing: 1px; }
        .day-summary p { color: var(--color-primary); font-size: 11px; text-transform: uppercase; font-weight: 700; }

        .exercise-list { display: flex; flex-direction: column; gap: 12px; }
        
        .exercise-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 16px; border-radius: var(--radius-sm); background: rgba(0,10,20,0.5);
            border: 1px solid var(--glass-border);
            transition: all 0.3s;
        }
        .exercise-item.completed { opacity: 0.5; border-color: var(--glass-border); }
        .exercise-item:hover { border-color: var(--color-primary); box-shadow: 0 0 15px rgba(0,240,255,0.1); }
        
        .item-left { display: flex; align-items: center; gap: 16px; }
        
        .ex-icon { width: 24px; display: flex; justify-content: center; }
        .circle-placeholder { 
            width: 18px; height: 18px; border-radius: 0; 
            border: 1px solid var(--glass-border); 
        }
        .text-success { color: var(--color-success); filter: drop-shadow(0 0 5px var(--color-success)); }
        
        .ex-info h4 { font-size: 15px; margin-bottom: 2px; color: #fff; letter-spacing: 1px; }
        .ex-info p { font-size: 11px; color: var(--text-secondary); text-transform: uppercase; font-weight: 600; }
        
        .btn-icon {
            width: 40px; height: 40px; border-radius: 0; border: 1px solid var(--color-primary);
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.2s;
            background: transparent; color: var(--color-primary);
            clip-path: polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
        }
        .btn-icon:hover { background: var(--color-primary); color: #000; box-shadow: 0 0 15px var(--color-primary); }
        
        .btn-success { background: var(--color-success); border-color: var(--color-success); color: #000; }
      `}</style>
        </div>
    );
};

export default WorkoutSection;
