import React, { useState } from 'react';
import { ChefHat, Leaf, Beef, ChevronDown, Zap, ArrowLeft, Plus } from 'lucide-react';
import { DIET_PLANS } from '../data/plans';

const DietSection = ({ onBack, context }) => {
    const { level = 'beginner', goal = 'bulking' } = context || {};
    const [dietType, setDietType] = useState('veg'); // 'veg' or 'non-veg'
    const isVeg = dietType === 'veg';

    const planData = DIET_PLANS[level]?.[goal] || DIET_PLANS['beginner']['bulking'];
    const currentMeals = isVeg ? planData.veg : planData.nonVeg;

    return (
        <div className="diet-section animate-in">
            <header className="fluid-header-simple">
                <button onClick={onBack} className="btn-ghost back-btn">
                    <ArrowLeft size={20} /> Back
                </button>
                <div className="page-title">
                    <ChefHat size={18} className="text-accent-purple" />
                    <h2>Nutrition Plan</h2>
                </div>
            </header>

            <div className="fluid-content-container">
                {/* Profile Summary */}
                <div className="glass-panel summary-card" style={{ marginBottom: '16px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div className="summary-info">
                            <span className="label">Mode: {goal}</span>
                            <span className="label">Level: {level}</span>
                        </div>
                        <div className="target-capsule">
                            <Zap size={14} fill="currentColor" />
                            <span>{planData.targetCalories} kcal</span>
                        </div>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="glass-panel control-card">
                    <div className="segmented-control">
                        <button
                            className={`segment-btn ${isVeg ? 'active' : ''}`}
                            onClick={() => setDietType('veg')}
                        >
                            <Leaf size={14} /> Vegetarian
                        </button>
                        <button
                            className={`segment-btn ${!isVeg ? 'active' : ''}`}
                            onClick={() => setDietType('non-veg')}
                        >
                            <Beef size={14} /> Non-Veg
                        </button>
                        <div className="segment-bg" style={{ transform: isVeg ? 'translateX(0)' : 'translateX(100%)' }}></div>
                    </div>
                </div>

                {/* Macros Visualization */}
                <div className="glass-panel dashboard-card" style={{ marginBottom: '24px' }}>
                    <div className="macro-grid">
                        <div className="macro-item">
                            <span className="macro-label">Protein</span>
                            <span className="macro-val">{planData.macros.protein}</span>
                            <div className="mini-bar"><div className="fill prot" style={{ width: '70%' }}></div></div>
                        </div>
                        <div className="macro-item">
                            <span className="macro-label">Carbs</span>
                            <span className="macro-val">{planData.macros.carbs}</span>
                            <div className="mini-bar"><div className="fill carb" style={{ width: '50%' }}></div></div>
                        </div>
                        <div className="macro-item">
                            <span className="macro-label">Fats</span>
                            <span className="macro-val">{planData.macros.fats}</span>
                            <div className="mini-bar"><div className="fill fat" style={{ width: '40%' }}></div></div>
                        </div>
                    </div>
                </div>

                {/* Meal List */}
                <div className="meal-list">
                    {currentMeals.map((meal) => (
                        <div key={meal.name} className="glass-card meal-item">
                            <div className="meal-left">
                                <span className="meal-time">{meal.time}</span>
                                <h4>{meal.name}</h4>
                                <p>{meal.items}</p>
                            </div>
                            <div className="meal-right">
                                <span className="cal-badge">{meal.calories}</span>
                            </div>
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
        
        .fluid-content-container { max-width: 600px; margin: 0 auto; }

        .summary-info { display: flex; gap: 12px; }
        .summary-info .label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-primary); background: rgba(0,240,255,0.1); padding: 4px 8px; }
        
        .target-capsule {
            display: flex; align-items: center; gap: 6px;
            color: var(--color-warning); font-weight: 800; font-family: monospace; font-size: 14px;
        }

        .control-card {
            padding: 8px; margin-bottom: 24px; display: flex; justify-content: center;
            border-radius: var(--radius-md); background: rgba(0,10,20,0.6);
            border: 1px solid var(--glass-border);
        }

        .segmented-control {
            display: flex; position: relative; width: 100%;
            background: rgba(0,0,0,0.4); padding: 4px; border-radius: var(--radius-sm);
        }
        .segment-btn {
            flex: 1; border: none; background: transparent;
            padding: 12px; font-weight: 700; color: var(--text-dim);
            z-index: 2; cursor: pointer; transition: color 0.3s;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            text-transform: uppercase; font-size: 11px; letter-spacing: 1px;
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

        /* Macro Grid */
        .macro-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 16px; }
        .macro-item { display: flex; flex-direction: column; gap: 4px; }
        .macro-label { font-size: 10px; text-transform: uppercase; color: var(--text-secondary); font-weight: 700; }
        .macro-val { font-size: 16px; font-weight: 800; color: #fff; font-family: monospace; }
        .mini-bar { height: 4px; background: rgba(255,255,255,0.05); }
        .fill { height: 100%; }
        .prot { background: var(--color-primary); box-shadow: 0 0 10px var(--color-primary); }
        .carb { background: var(--color-accent-purple); box-shadow: 0 0 10px var(--color-accent-purple); }
        .fat { background: var(--color-warning); box-shadow: 0 0 10px var(--color-warning); }

        .meal-list { display: flex; flex-direction: column; gap: 12px; }
        .meal-item {
            display: flex; justify-content: space-between; align-items: center;
            padding: 16px; border-radius: var(--radius-sm); background: rgba(0,10,20,0.5);
            border: 1px solid var(--glass-border);
            transition: all 0.2s;
        }
        .meal-item:hover { border-color: var(--color-primary); transform: translateX(4px); }
        
        .meal-left h4 { font-size: 14px; margin-bottom: 2px; color: #fff; letter-spacing: 1px; }
        .meal-left p { font-size: 12px; color: var(--text-secondary); }
        .meal-time { font-size: 9px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; margin-bottom: 4px; display: block; }
        
        .cal-badge {
            font-weight: 700; font-size: 13px; color: #000;
            background: var(--color-primary); padding: 4px 10px; border-radius: 0;
            clip-path: polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
        }
      `}</style>
        </div>
    );
};

export default DietSection;
