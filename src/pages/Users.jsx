
import React, { useState } from 'react';

const DUMMY_USERS = [
  {
    id: 1,
    name: 'Alice Johnson',
    username: 'alicej',
    reputation: 1520,
    badges: ['Expert', 'SQL', 'Helpful'],
    joined: '2023-01-15',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Full-stack developer and SQL enthusiast.',
  },
  {
    id: 2,
    name: 'Bob Smith',
    username: 'bobsmith',
    reputation: 980,
    badges: ['Python', 'Supportive'],
    joined: '2022-11-03',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Backend engineer, loves helping others.',
  },
  {
    id: 3,
    name: 'Priya Patel',
    username: 'priyap',
    reputation: 2100,
    badges: ['JavaScript', 'Top Answer', 'Mentor'],
    joined: '2021-08-21',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Frontend wizard and mentor.',
  },
  {
    id: 4,
    name: 'Chen Wei',
    username: 'chenw',
    reputation: 1340,
    badges: ['C#', 'SQL', 'Friendly'],
    joined: '2022-04-10',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    bio: 'Database admin and C# expert.',
  },
];

const Users = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = DUMMY_USERS.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.badges.some(badge => badge.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{
      maxWidth: 900,
      margin: '2rem auto',
      padding: '1rem',
      minHeight: '100vh',
      color: '#7ae2cf'
    }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Community Users</h2>
      <div style={{ marginBottom: '1.5rem', textAlign: 'right' }}>
        <input
          type="text"
          placeholder="Search users or badges..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 6,
            border: '1px solid #1a2e37',
            background: '#16222a',
            color: '#fff',
            fontSize: '1rem',
            width: 250,
            maxWidth: '100%',
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        justifyContent: 'flex-start'
      }}>
        {filteredUsers.length === 0 && (
          <div style={{ color: '#e26a7a', fontSize: '1.1rem', margin: '2rem auto' }}>
            No users found.
          </div>
        )}
        {filteredUsers.map(user => (
          <div key={user.id} style={{
            background: '#1a2e37',
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '1.2rem',
            display: 'flex',
            gap: '1.2rem',
            minWidth: 260,
            maxWidth: 350,
            flex: '1 1 300px',
            alignItems: 'flex-start'
          }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #7ae2cf'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                gap: '0.7rem',
                alignItems: 'baseline',
                marginBottom: '0.2rem'
              }}>
                <span style={{
                  fontWeight: 600,
                  color: '#7ae2cf',
                  fontSize: '1.1rem'
                }}>{user.name}</span>
                <span style={{
                  color: '#aaa',
                  fontSize: '0.95rem'
                }}>@{user.username}</span>
              </div>
              <div style={{
                color: '#e6e6e6',
                fontSize: '0.97rem',
                marginBottom: '0.4rem'
              }}>{user.bio}</div>
              <div style={{
                fontSize: '0.9rem',
                color: '#b7e2e2',
                marginBottom: '0.4rem',
                display: 'flex',
                gap: '1.2rem'
              }}>
                <span>Reputation: <b>{user.reputation}</b></span>
                <span>Joined: {user.joined}</span>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {user.badges.map(badge => (
                  <span key={badge} style={{
                    background: '#7ae2cf',
                    color: '#1a2e37',
                    borderRadius: 12,
                    padding: '0.2rem 0.7rem',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}>{badge}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
