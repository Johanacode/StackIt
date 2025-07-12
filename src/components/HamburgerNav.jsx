import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerNav.css';

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

  return (
    <nav className="hamburger-nav">
      <div className="nav-header">
        <Link to="/" className="nav-logo">Ctrl Alt Elite</Link>
        <button className="hamburger-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          <span className={open ? 'hamburger active' : 'hamburger'}></span>
        </button>
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
