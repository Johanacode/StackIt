import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavPanel = ({ user }) => {
    const navigate = useNavigate();
    return (
        <nav className="nav-panel" style={{ background: '#1a2e37', padding: '1rem 0', borderRight: '1px solid #2d3748', minHeight: '100vh', minWidth: 220 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                <div className="logo" style={{ marginBottom: '1rem', background: '#7ae2cf', borderRadius: 8, padding: 8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#06202b' }}>forum</span>
                </div>
                <button className="nav-btn" onClick={() => navigate('/')} style={navBtnStyle}>Home</button>
                <button className="nav-btn" onClick={() => navigate('/add')} style={navBtnStyle}>Ask Question</button>
                <button className="nav-btn" onClick={() => navigate('/tags')} style={navBtnStyle}>Tags</button>
                <button className="nav-btn" onClick={() => navigate('/users')} style={navBtnStyle}>Users</button>
                <button className="nav-btn" onClick={() => navigate('/about')} style={navBtnStyle}>About</button>
                <div style={{ marginTop: '2rem' }}>
                    {user ? (
                        <span style={{ color: '#7ae2cf', fontWeight: 500 }}>Welcome, {user.name}</span>
                    ) : (
                        <button className="nav-btn" onClick={() => navigate('/login')} style={{ ...navBtnStyle, background: '#7ae2cf', color: '#06202b' }}>Login / Signup</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

const navBtnStyle = {
    background: 'none',
    color: '#7ae2cf',
    border: 'none',
    borderRadius: 6,
    padding: '0.75rem 1.5rem',
    fontWeight: 500,
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '0.5rem',
    width: '100%',
    textAlign: 'left',
};

export default NavPanel;
