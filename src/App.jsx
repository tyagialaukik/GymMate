import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeScreen from './components/HomeScreen';
import FitnessSection from './components/FitnessSection';
import DietSection from './components/DietSection';
import WorkoutSection from './components/WorkoutSection';
import BMICalculator from './components/BMICalculator';
import ExerciseGuide from './components/ExerciseGuide';
import FoodScanner from './components/FoodScanner';
import AIChat from './components/AIChat';
import AuthModal from './components/AuthModal';
import { Cpu } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [appContext, setAppContext] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Persistence: Check for token on mount
  React.useEffect(() => {
    const token = localStorage.getItem('gymmate_token');
    const storedUser = localStorage.getItem('gymmate_user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('gymmate_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('gymmate_token');
    localStorage.removeItem('gymmate_user');
    setUser(null);
  };

  const handleNavigate = (screen, context = {}) => {
    setAppContext(prev => ({ ...prev, ...context }));
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'fitness':
        return <FitnessSection onNavigate={handleNavigate} onBack={() => setCurrentScreen('home')} />;
      case 'diet':
        return <DietSection onBack={() => setCurrentScreen('home')} context={appContext} />;
      case 'workout':
        return <WorkoutSection onBack={() => setCurrentScreen('fitness')} context={appContext} />;
      case 'bmi':
        return <BMICalculator onBack={() => setCurrentScreen('home')} />;
      case 'exercise-guide':
        return <ExerciseGuide onBack={() => setCurrentScreen('home')} />;
      case 'scanner':
        return <FoodScanner onBack={() => setCurrentScreen('home')} />;
      case 'home':
      default:
        return <HomeScreen onNavigate={(screen) => handleNavigate(screen)} />;
    }
  };

  return (
    <div className="app-main">
      <Layout user={user} onAuthClick={() => setIsAuthOpen(true)}>
        {renderScreen()}
      </Layout>

      {/* Global Modals & Overlays */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {!isChatOpen && (
        <button className="jarvis-trigger-fab" onClick={() => setIsChatOpen(true)}>
          <div className="fab-glow"></div>
          <Cpu size={24} />
          <span className="fab-label">JARVIS</span>
        </button>
      )}

      <style>{`
        .app-main { background: #000; min-height: 100vh; }
        .jarvis-trigger-fab {
          position: fixed; bottom: 30px; right: 30px;
          width: 56px; height: 56px; border-radius: 12px;
          background: #000; border: 1px solid var(--color-primary);
          color: var(--color-primary); display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 999; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
          overflow: visible;
        }
        
        .fab-glow {
          position: absolute; inset: -4px; border-radius: 14px;
          border: 1px solid var(--color-primary); opacity: 0.3;
          animation: fab-pulse 2s infinite;
        }
        
        @keyframes fab-pulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }

        .fab-label {
          position: absolute; right: 70px; background: rgba(0,0,0,0.8);
          color: var(--color-primary); font-size: 10px; font-weight: 800;
          padding: 4px 10px; border: 1px solid var(--color-primary);
          letter-spacing: 2px; opacity: 0; transform: translateX(10px);
          transition: 0.3s; pointer-events: none;
        }
        
        .jarvis-trigger-fab:hover {
          transform: scale(1.1);
          background: var(--color-primary); color: #000;
          box-shadow: 0 0 25px var(--color-primary);
        }
        
        .jarvis-trigger-fab:hover .fab-label {
          opacity: 1; transform: translateX(0);
        }
      `}</style>
    </div>
  );
}

export default App;
