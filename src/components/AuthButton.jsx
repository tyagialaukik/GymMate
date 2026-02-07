import React from 'react';
import { User, LogIn, ChevronDown } from 'lucide-react';

const AuthButton = ({ user, onClick }) => {
    if (!user) {
        return (
            <button className="auth-btn login" onClick={onClick}>
                <LogIn size={18} />
                <span>Login / Sign Up</span>
                <div className="btn-glow"></div>
            </button>
        );
    }

    return (
        <button className="auth-btn profile" onClick={onClick}>
            <div className="avatar">
                {user.avatar ? <img src={user.avatar} alt="User" /> : <User size={16} />}
            </div>
            <div className="user-meta">
                <span className="name">{user.name}</span>
                <span className="email">{user.email}</span>
            </div>
            <ChevronDown size={14} className="chevron" />
            <div className="profile-active-line"></div>
        </button>
    );
};

export default AuthButton;
