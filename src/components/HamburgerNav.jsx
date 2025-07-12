
const navLinks = [
  { to: '/', label: 'Questions' },
  { to: '/add', label: 'Ask' },
  { to: '/tags', label: 'Tags' },
  { to: '/users', label: 'Users' },
  { to: '/about', label: 'About' },
  { to: '/login', label: 'Login/Signup' },
];

export default function HamburgerNav({ user }) {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  // Mock notifications with dummy links
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Someone answered your question', read: false, link: '/question/1' },
    { id: 2, text: 'Someone commented on your answer', read: false, link: '/question/2' },
    { id: 3, text: 'Someone mentioned you: @ReactDev', read: false, link: '/users' },
    { id: 4, text: 'Welcome to Ctrl Alt Elite!', read: true, link: '/' },
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const handleBellClick = () => {
    setNotifOpen(!notifOpen);
    // Mark all as read when opening dropdown
    if (!notifOpen) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };
  const handleNotificationClick = (n) => {
    setNotifOpen(false);
    if (n.link) navigate(n.link);
  };

  return (
    <nav className="hamburger-nav">
      <div className="nav-header">
        <Link to="/" className="nav-logo">Ctrl Alt Elite</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="notif-bell-btn" onClick={handleBellClick} style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer' }} aria-label="Notifications">
            <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#7ae2cf' }}>notifications</span>
            {unreadCount > 0 && (
              <span className="notif-count" style={{ position: 'absolute', top: 0, right: 0, background: '#e26a7a', color: '#fff', borderRadius: '50%', fontSize: '0.8rem', padding: '2px 6px', fontWeight: 600 }}>{unreadCount}</span>
            )}
          </button>
          {notifOpen && (
            <div className="notif-dropdown" style={{ position: 'absolute', top: '2.5rem', right: '2rem', background: '#1a2e37', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', minWidth: '260px', zIndex: 100, padding: '1rem' }}>
              <h4 style={{ color: '#7ae2cf', marginBottom: '0.5rem', fontSize: '1rem' }}>Notifications</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {notifications.length === 0 && <li style={{ color: '#f5eed' }}>No notifications</li>}
                {notifications.map(n => (
                  <li
                    key={n.id}
                    style={{ color: n.read ? '#f5eed' : '#7ae2cf', marginBottom: '0.5rem', fontWeight: n.read ? 400 : 600, cursor: n.link ? 'pointer' : 'default' }}
                    onClick={() => handleNotificationClick(n)}
                  >
                    {n.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button className="hamburger-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            <span className={open ? 'hamburger active' : 'hamburger'}></span>
          </button>
        </div>
      </div>
      <div className={open ? 'nav-links open' : 'nav-links'}>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} className="nav-link" onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
