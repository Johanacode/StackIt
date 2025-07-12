import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login');
    const [form, setForm] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.email || !form.password || (mode === 'signup' && !form.name)) {
            setError('Please fill all required fields.');
            return;
        }
        // Simulate login/signup
        setTimeout(() => {
            if (mode === 'login') {
                localStorage.setItem('user', JSON.stringify({ name: 'User', email: form.email }));
            } else {
                localStorage.setItem('user', JSON.stringify({ name: form.name, email: form.email }));
            }
            navigate('/');
        }, 500);
    };

    const handleGuest = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#06202b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#1a2e37', padding: '2rem', borderRadius: 12, minWidth: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <h2 style={{ color: '#7ae2cf', marginBottom: '1.5rem', textAlign: 'center' }}>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {mode === 'signup' && (
                        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} style={inputStyle} />
                    )}
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} />
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} style={inputStyle} />
                    {error && <div style={{ color: '#e53e3e', fontSize: '0.95em' }}>{error}</div>}
                    <button type="submit" style={btnStyle}>{mode === 'login' ? 'Login' : 'Sign Up'}</button>
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ ...btnStyle, background: 'none', color: '#7ae2cf', border: 'none' }}>
                        {mode === 'login' ? 'Create an account' : 'Already have an account? Login'}
                    </button>
                </div>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button onClick={handleGuest} style={{ ...btnStyle, background: '#243642', color: '#7ae2cf' }}>Continue as Guest</button>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '0.75rem 1rem',
    borderRadius: 6,
    border: '1px solid #2d3748',
    background: '#243642',
    color: '#7ae2cf',
    fontSize: '1rem',
};
const btnStyle = {
    background: '#7ae2cf',
    color: '#06202b',
    borderRadius: 6,
    padding: '0.75rem 1.5rem',
    fontWeight: 500,
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
};

export default LoginSignup;
