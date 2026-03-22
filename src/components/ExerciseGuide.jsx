import React, { useState } from 'react';
import { Book, Play, ArrowLeft, Search, Info, ExternalLink } from 'lucide-react';
import { EXERCISE_GUIDE_DATA } from '../data/exerciseData';

const ExerciseGuide = ({ onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [selectedExercise, setSelectedExercise] = useState(null);

    const categories = ['ALL', 'CHEST', 'BACK', 'LEGS', 'SHOULDERS', 'CORE', 'ARMS'];

    const filteredExercises = EXERCISE_GUIDE_DATA.filter(ex => {
        const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              ex.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || ex.category.toUpperCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="exercise-guide animate-in">
            <header className="fluid-header-simple">
                <button onClick={onBack} className="btn-ghost back-btn">
                    <ArrowLeft size={20} /> Back
                </button>
                <div className="page-title">
                    <Book size={18} className="text-accent-blue" />
                    <h2>Tactical Library</h2>
                </div>
            </header>

            <div className="guide-container">
                {/* Search & Filter */}
                <div className="discovery-header">
                    <div className="glass-panel search-panel">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search movement core..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="filter-pills">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="cards-grid">
                    {filteredExercises.map(ex => (
                        <div key={ex.id} className="glass-card guide-card" onClick={() => setSelectedExercise(ex)}>
                            <div className="guide-card-header">
                                <span className="cat-tag">{ex.category}</span>
                                <h3>{ex.name}</h3>
                            </div>
                            <p className="description-preview">{ex.description}</p>
                            <div className="card-footer">
                                <div className="btn-mini">
                                    <Info size={14} /> Details
                                </div>
                                <a
                                    href={ex.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-mini primary"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Play size={14} fill="currentColor" /> Watch
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Overlay/Modal */}
            {selectedExercise && (
                <div className="guide-overlay animate-in" onClick={() => setSelectedExercise(null)}>
                    <div className="guide-modal bento-item" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="title-group">
                                <span>{selectedExercise.category}</span>
                                <h2>{selectedExercise.name}</h2>
                            </div>
                            <button className="btn-close" onClick={() => setSelectedExercise(null)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="info-section">
                                <h4>Mechanical Overview</h4>
                                <p>{selectedExercise.description}</p>
                            </div>

                            <div className="info-section">
                                <h4>Execution Steps</h4>
                                <ul>
                                    {selectedExercise.instructions.map((step, idx) => (
                                        <li key={idx}><TrendingUp size={12} className="text-accent-blue" /> {step}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-actions">
                                <a
                                    href={selectedExercise.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-full"
                                >
                                    <Play size={18} fill="currentColor" /> Access YouTube Tutorial <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .exercise-guide { max-width: 1000px; margin: 0 auto; }
                .fluid-header-simple { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
                .page-title { display: flex; align-items: center; gap: 8px; color: var(--color-primary); }
                
                .guide-container { display: flex; flex-direction: column; gap: 24px; }

                .discovery-header { display: flex; flex-direction: column; gap: 16px; margin-bottom: 8px; }

                .search-panel { 
                    display: flex; align-items: center; gap: 12px; padding: 12px 20px;
                    background: rgba(0, 240, 255, 0.05); border: 1px solid var(--glass-border);
                }
                .search-icon { color: var(--color-primary); opacity: 0.6; }
                .search-panel input { 
                    flex: 1; background: transparent; border: none; outline: none; 
                    color: #fff; font-family: 'Rajdhani', sans-serif; font-size: 16px;
                }
                
                .filter-pills {
                    display: flex; gap: 8px; overflow-x: auto; padding-bottom: 8px;
                }
                .filter-pills::-webkit-scrollbar { display: none; }
                .filter-pill {
                    padding: 6px 16px; background: rgba(0, 10, 20, 0.6);
                    border: 1px solid var(--glass-border); border-radius: 20px;
                    color: var(--text-secondary); font-size: 10px; font-weight: 800; letter-spacing: 1px;
                    cursor: pointer; transition: all 0.3s; white-space: nowrap;
                }
                .filter-pill:hover { border-color: var(--color-primary); color: #fff; }
                .filter-pill.active {
                    background: var(--color-primary); color: #000;
                    border-color: var(--color-primary); box-shadow: 0 0 15px rgba(0,240,255,0.3);
                }

                .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
                
                .guide-card {
                    padding: 24px; cursor: pointer; display: flex; flex-direction: column; gap: 12px;
                    transition: all 0.3s ease-out;
                    border: 1px solid var(--glass-border);
                }
                .guide-card:hover {
                    transform: translateY(-6px);
                    border-color: var(--color-primary);
                    box-shadow: 0 10px 30px rgba(0, 240, 255, 0.15);
                }
                
                .cat-tag { font-size: 10px; font-weight: 800; text-transform: uppercase; color: var(--color-primary); letter-spacing: 1px; }
                .guide-card h3 { font-size: 20px; letter-spacing: 1px; color: #fff; }
                .description-preview { font-size: 13px; color: var(--text-secondary); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                
                .card-footer { display: flex; gap: 10px; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--glass-border); }
                .btn-mini { 
                    flex: 1; padding: 8px; border: 1px solid var(--glass-border); 
                    font-size: 11px; font-weight: 700; text-transform: uppercase;
                    display: flex; align-items: center; justify-content: center; gap: 6px; color: #fff;
                    transition: 0.2s; text-decoration: none;
                }
                .btn-mini:hover { background: rgba(255,255,255,0.05); }
                .btn-mini.primary { background: var(--color-primary); border-color: var(--color-primary); color: #000; }
                .btn-mini.primary:hover { transform: scale(1.02); box-shadow: 0 0 15px var(--color-primary); }

                /* Modal Styles */
                .guide-overlay {
                    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8);
                    z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 20px;
                    backdrop-filter: blur(5px);
                }
                .guide-modal { width: 100%; max-width: 500px; padding: 40px; background: rgba(0, 10, 20, 0.95); }
                .modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
                .title-group span { font-size: 11px; font-weight: 800; color: var(--color-primary); text-transform: uppercase; }
                .title-group h2 { font-size: 32px; letter-spacing: 2px; }
                .btn-close { background: transparent; border: none; color: #fff; cursor: pointer; }

                .info-section { margin-bottom: 24px; }
                .info-section h4 { font-size: 12px; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px; }
                .info-section p { font-size: 15px; color: #ddd; line-height: 1.6; }
                .info-section ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
                .info-section li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #fff; }

                .btn-full {
                    width: 100%; padding: 16px; background: var(--color-primary); color: #000;
                    border: none; font-weight: 800; font-size: 14px; text-transform: uppercase;
                    display: flex; align-items: center; justify-content: center; gap: 12px;
                    text-decoration: none; transition: 0.3s;
                }
                .btn-full:hover { transform: scale(1.02); box-shadow: 0 0 30px var(--color-primary); }
            `}</style>
        </div>
    );
};

// Internal icon for modal close
const X = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const TrendingUp = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

export default ExerciseGuide;
