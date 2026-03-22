import React from 'react';
import { Activity, Menu, Bell } from 'lucide-react';
import AuthButton from './AuthButton';

const Layout = ({ children, user, onAuthClick }) => {
  return (
    <div className="layout-root">
      {/* Aurora Background Layer */}
      <div className="aurora-bg">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
        <div className="noise-overlay"></div>
      </div>

      <header className="fluid-header">
        <div className="header-left">
          <div className="logo-pill">
            <Activity size={20} className="logo-icon" />
            <span className="logo-text">GymMate AI</span>
          </div>
        </div>

        <div className="header-right">
          <AuthButton user={user} onClick={onAuthClick} />
          <button className="icon-btn header-btn"><Bell size={20} /></button>
          <button className="icon-btn header-btn"><Menu size={20} /></button>
        </div>
      </header>

      <main className="fluid-content">
        {children}
      </main>

      <style>{`
        .layout-root {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          isolation: isolate;
        }

        /* --- Ambient Background --- */
        .aurora-bg {
          position: fixed; inset: 0; z-index: -10;
          background: var(--bg-base);
          overflow: hidden;
        }
        
        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
          animation: float 10s infinite ease-in-out;
        }
        
        .blob-1 {
          top: -10%; left: -10%; width: 50vw; height: 50vw;
          background: var(--color-accent-blue);
          animation-delay: 0s;
        }
        
        .blob-2 {
          bottom: -10%; right: -10%; width: 60vw; height: 60vw;
          background: var(--color-accent-purple);
          animation-delay: -5s;
        }

        .blob-3 {
            top: 40%; left: 30%; width: 40vw; height: 40vw;
            background: rgba(255,255,255,0.05);
            mix-blend-mode: overlay;
        }
        
        .noise-overlay {
            position: absolute; inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
            opacity: 0.4;
            pointer-events: none;
        }

        /* --- Floating Header --- */
        .fluid-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 32px;
          position: sticky; top: 0; z-index: 50;
        }
        
        .logo-pill {
            display: flex; align-items: center; gap: 12px;
            padding: 8px 16px;
            background: var(--glass-bg-2);
            backdrop-filter: blur(20px);
            border-radius: var(--radius-full);
            box-shadow: var(--shadow-sm);
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .logo-icon { color: var(--color-accent-blue); }
        .logo-text { font-weight: 700; font-size: 16px; letter-spacing: -0.5px; color: var(--text-primary); }

        .header-right { display: flex; align-items: center; }

        .icon-btn { cursor: pointer; transition: 0.3s; border: none; }
        .header-btn {
            background: var(--glass-bg-2);
            backdrop-filter: blur(20px);
            width: 44px; height: 44px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            color: var(--text-primary);
            margin-left: 12px;
        }
        .header-btn:hover { transform: scale(1.05); background: var(--glass-bg-1); }

        /* --- Auth Button Style --- */
        .auth-btn {
            height: 44px; padding: 0 20px;
            border-radius: var(--radius-full);
            display: flex; align-items: center; gap: 12px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 700; cursor: pointer; transition: 0.3s;
            position: relative; border: 1px solid rgba(255,255,255,0.1);
        }
        
        .auth-btn.login {
            background: #000; color: var(--color-primary);
            border-color: var(--color-primary);
            overflow: hidden;
        }
        .auth-btn.login:hover { background: var(--color-primary); color: #000; box-shadow: 0 0 20px var(--color-primary); }
        
        .btn-glow {
            position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.4), transparent);
            transform: skewX(-20deg);
            animation: shimmerEffect 3s infinite;
        }
        @keyframes shimmerEffect { 
            0% { left: -100%; } 
            20% { left: 200%; } 
            100% { left: 200%; } 
        }
        
        .auth-btn.profile {
            background: rgba(255,255,255,0.05); color: #fff;
            padding-left: 6px;
        }
        .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); display: flex; align-items: center; justify-content: center; color: #000; overflow: hidden; }
        .avatar img { width: 100%; height: 100%; object-fit: cover; }
        .user-meta { display: flex; flex-direction: column; text-align: left; }
        .user-meta .name { font-size: 12px; line-height: 1; margin-bottom: 2px; }
        .user-meta .email { font-size: 9px; opacity: 0.5; font-weight: 500; }
        .profile-active-line { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 40%; height: 2px; background: var(--color-primary); box-shadow: 0 0 10px var(--color-primary); }

        /* --- Main Content --- */
        .fluid-content {
          flex: 1;
          padding: 0 32px 32px 32px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }
        
        @media (max-width: 768px) {
            .fluid-header { padding: 16px; }
            .fluid-content { padding: 0 16px 24px 16px; }
            .auth-btn span { display: none; }
            .user-meta { display: none; }
            .auth-btn { padding: 0 12px; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
