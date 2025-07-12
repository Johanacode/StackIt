import React from 'react';

const mockUsers = [
    { name: 'Jane Doe', role: 'Moderator' },
    { name: 'John Smith', role: 'Contributor' },
    { name: 'Guest', role: 'Guest' },
];

const Users = () => (
    <div style={{ minHeight: '100vh', background: '#06202b', color: '#7ae2cf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#1a2e37', padding: '2rem', borderRadius: 12, minWidth: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h2 style={{ marginBottom: '1rem' }}>Users</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {mockUsers.map(user => (
                    <li key={user.name} style={{ marginBottom: '0.75rem', fontWeight: 500 }}>
                        {user.name} <span style={{ color: '#7ae2cf', fontWeight: 400 }}>({user.role})</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default Users;
