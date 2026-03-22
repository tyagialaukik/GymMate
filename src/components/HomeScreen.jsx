import React from 'react';
import { Dumbbell, Book, Activity, ArrowRight, Zap, Target, TrendingUp, Scan } from 'lucide-react';

const HomeScreen = ({ onNavigate }) => {
  return (
    <div className="home-dashboard animate-in">
      {/* Welcome Block - Full Width */}
      <div className="bento-item welcome-tile animate-in">
        <div className="hero-bg-anim"></div>
        <div className="welcome-text" style={{ zIndex: 2, position: 'relative' }}>
          <h2>Good Evening,</h2>
          <h1 className="text-fluid welcome-title">Athlete</h1>
          <p className="subtitle">System Optimal. Ready for Protocol.</p>
        </div>
        <div className="daily-stats" style={{ zIndex: 2, position: 'relative' }}>
          <div className="stat-pill">
            <Zap size={16} fill="currentColor" className="text-accent-orange" />
            <span>420 kcal</span>
          </div>
          <div className="stat-pill">
            <TrendingUp size={16} className="text-accent-green" />
            <span>Active</span>
          </div>
        </div>
      </div>

      {/* Main Action Grid */}
      <div className="bento-grid">
        {/* Fitness Card */}
        <button className="bento-item action-card card-fitness animate-in" onClick={() => onNavigate('fitness')}>
          <div className="card-content">
            <div className="icon-bubble bubble-blue">
              <Dumbbell size={24} />
            </div>
            <div className="text-content">
              <h3>Training</h3>
              <p>Execute specialized protocols</p>
            </div>
            <div className="hover-indicator"><ArrowRight size={20} /></div>
          </div>
        </button>

        {/* Exercise Guide Card (Renamed from Nutrition) */}
        <button className="bento-item action-card card-diet animate-in" onClick={() => onNavigate('exercise-guide')}>
          <div className="card-content">
            <div className="icon-bubble bubble-purple">
              <Book size={24} />
            </div>
            <div className="text-content">
              <h3>Exercise Guide</h3>
              <p>Tactical movement library</p>
            </div>
            <div className="hover-indicator"><ArrowRight size={20} /></div>
          </div>
        </button>

        {/* BMI Card */}
        <button className="bento-item action-card card-bmi animate-in" onClick={() => onNavigate('bmi')}>
          <div className="card-content">
            <div className="icon-bubble bubble-pink">
              <Activity size={24} />
            </div>
            <div className="text-content">
              <h3>Biometrics</h3>
              <p>Analyze body stats</p>
            </div>
            <div className="hover-indicator"><ArrowRight size={20} /></div>
          </div>
        </button>

        {/* Macro Scanner Card [NEW] */}
        <button className="bento-item action-card card-scanner animate-in" onClick={() => onNavigate('scanner')}>
          <div className="card-content">
            <div className="icon-bubble bubble-cyan">
              <Scan size={24} />
            </div>
            <div className="text-content">
              <h3>Macro Scanner</h3>
              <p>AI Nutritional Vision</p>
            </div>
            <div className="hover-indicator"><ArrowRight size={20} /></div>
          </div>
        </button>
      </div>

      {/* Quick Actions / Today's Stats Row [NEW] */}
      <div className="stats-row animate-in" style={{ animationDelay: '0.6s' }}>
        <div className="stat-chip">
          <div className="chip-icon water"><Activity size={16} /></div>
          <div className="chip-data">
            <span className="label">Hydration</span>
            <span className="val">2.5<small>L</small></span>
          </div>
          <div className="progress-mini"><div className="fill" style={{width: '60%'}}></div></div>
        </div>
        <div className="stat-chip">
          <div className="chip-icon fire"><Zap size={16} /></div>
          <div className="chip-data">
            <span className="label">Burned</span>
            <span className="val">850<small>kcal</small></span>
          </div>
          <div className="progress-mini"><div className="fill" style={{width: '85%'}}></div></div>
        </div>
        <div className="stat-chip">
          <div className="chip-icon sleep"><Book size={16} /></div>
          <div className="chip-data">
            <span className="label">Recovery</span>
            <span className="val">96<small>%</small></span>
          </div>
          <div className="progress-mini"><div className="fill" style={{width: '96%'}}></div></div>
        </div>
        <div className="stat-chip">
          <div className="chip-icon streak" style={{ background: 'rgba(255, 215, 0, 0.1)', color: '#ffd700' }}><Zap size={16} /></div>
          <div className="chip-data">
            <span className="label">Streak</span>
            <span className="val">7<small>days</small></span>
          </div>
          <div className="progress-mini"><div className="fill" style={{width: '100%', background: '#ffd700', boxShadow: '0 0 10px #ffd700'}}></div></div>
        </div>
      </div>

      <style>{`
        .home-dashboard { display: flex; flex-direction: column; gap: 24px; }
        
        .welcome-tile { animation-delay: 0.1s; z-index: 10; }
        .card-fitness { animation-delay: 0.2s; }
        .card-diet { animation-delay: 0.3s; }
        .card-bmi { animation-delay: 0.4s; }
        .card-scanner { animation-delay: 0.5s; }

        /* --- Bento Grid Layout --- */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        /* --- Common Tile Styles --- */
        .bento-item {
          background: rgba(0, 10, 20, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md); 
          padding: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.05);
          transition: all 0.3s ease;
        }

        .bento-item::before {
            content: ''; position: absolute; top: 0; left: 0; width: 15px; height: 15px;
            border-top: 2px solid var(--color-primary); border-left: 2px solid var(--color-primary);
        }

        .bento-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
          border-color: var(--color-primary);
        }

        /* --- Welcome Tile --- */
        .welcome-tile {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          min-height: 200px;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 240, 255, 0.05) 100%);
          border: 1px solid rgba(0, 240, 255, 0.2);
          position: relative;
        }
        
        .hero-bg-anim {
            position: absolute; right: 0; top: 0; bottom: 0; width: 50%;
            pointer-events: none; opacity: 0.15; z-index: 0;
            background-image: radial-gradient(circle at center, var(--color-primary) 1px, transparent 1px);
            background-size: 20px 20px;
            animation: panBg 20s linear infinite;
            mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
            -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
        }
        
        @keyframes panBg {
            from { background-position: 0 0; }
            to { background-position: -400px -200px; }
        }

        .welcome-text h2 {
          font-size: 14px;
          color: #fff;
          font-weight: 800;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 3px;
          opacity: 0.7;
        }
        
        .welcome-title {
          font-size: 64px !important;
          font-weight: 900;
          letter-spacing: 6px;
          margin-bottom: 16px;
          color: var(--color-primary);
          text-shadow: 2px 2px 0px rgba(0,0,0,0.5), 0 0 30px var(--color-primary);
          text-transform: uppercase;
        }
        
        .subtitle {
            font-size: 13px;
            color: var(--color-success);
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            background: rgba(0, 255, 157, 0.1);
            padding: 4px 12px;
            display: inline-block;
            border-left: 2px solid var(--color-success);
        }

        .daily-stats { display: flex; gap: 12px; }
        .stat-pill {
            background: rgba(0,0,0,0.6);
            border: 1px solid var(--color-primary);
            padding: 10px 20px;
            border-radius: 4px;
            display: flex; align-items: center; gap: 8px;
            font-size: 12px;
            font-weight: 800;
            color: #fff;
        }
        
        .text-accent-orange { color: var(--color-warning); }
        .text-accent-green { color: var(--color-success); }

        /* --- Action Cards --- */
        .action-card {
            text-align: left;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 220px;
            background: rgba(0,0,0,0.4);
            border: none;
        }
        
        .card-content {
            position: relative;
            z-index: 2; height: 100%;
            display: flex; flex-direction: column; justify-content: space-between;
        }
        
        .icon-bubble {
            width: 56px; height: 56px;
            border-radius: 4px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 24px;
            color: #000;
            box-shadow: 0 0 15px currentColor;
        }
        
        .bubble-blue { background: var(--color-primary); }
        .bubble-purple { background: var(--color-accent-purple); }
        .bubble-pink { background: var(--color-accent-pink); }
        .bubble-cyan { background: var(--color-primary); box-shadow: 0 0 20px var(--color-primary); }

        .text-content h3 { font-size: 22px; margin-bottom: 6px; color: #fff; letter-spacing: 1px; font-weight: 800; }
        .text-content p { font-size: 12px; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        
        .hover-indicator {
            position: absolute; bottom: 0; right: 0;
            opacity: 0; transform: translateX(-10px);
            transition: all 0.3s ease;
            color: var(--color-primary);
        }
        
        .action-card:hover .hover-indicator { opacity: 1; transform: translateX(0); }
        
        /* --- Today's Stats Row --- */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .stat-chip {
          background: rgba(0, 10, 20, 0.5);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .chip-icon { width: 32px; height: 32px; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
        .chip-icon.water { background: rgba(0, 240, 255, 0.1); color: #00f0ff; }
        .chip-icon.fire { background: rgba(255, 100, 0, 0.1); color: #ff6400; }
        .chip-icon.sleep { background: rgba(188, 19, 254, 0.1); color: #bc13fe; }
        
        .chip-data { display: flex; flex-direction: column; }
        .chip-data .label { font-size: 10px; text-transform: uppercase; color: var(--text-secondary); font-weight: 800; letter-spacing: 1px; }
        .chip-data .val { font-size: 20px; font-weight: 800; color: #fff; display: flex; align-items: baseline; gap: 4px; }
        .chip-data small { font-size: 10px; color: var(--color-primary); }
        
        .progress-mini { width: 100%; height: 2px; background: rgba(255,255,255,0.1); margin-top: auto; }
        .progress-mini .fill { height: 100%; background: var(--color-primary); box-shadow: 0 0 10px var(--color-primary); }

        @media (max-width: 768px) {
            .welcome-tile { flex-direction: column; align-items: flex-start; gap: 24px; padding: 24px; }
            .daily-stats { width: 100%; justify-content: flex-start; }
            .welcome-title { font-size: 40px !important; }
            .stats-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;
