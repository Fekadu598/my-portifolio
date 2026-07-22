import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function TopBar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const photoUrl = profile?.photo ? `http://localhost:5000${profile.photo}` : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/work', label: 'Work' },
    { href: '/skills', label: 'Skills' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className={`topbar${scrolled ? ' scrolled' : ''}`}>
      <div className="topbar-container">
        <a href="/" className="topbar-logo-group">
          <div className="topbar-avatar">
            {photoUrl ? (
              <img src={photoUrl} alt="Fekadu" className="topbar-avatar-img" />
            ) : (
              <div className="topbar-avatar-fallback">F</div>
            )}
            <span className="topbar-avatar-dot" />
          </div>
          <span className="topbar-logo">Fekadu T.<span className="logo-dot" /></span>
        </a>
        <div className="topbar-right">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`topbar-item${location.pathname === l.href ? ' active' : ''}`}>{l.label}</a>
          ))}
          <a href="http://localhost:3001" className="topbar-item topbar-admin" target="_blank" rel="noreferrer"><span>Admin</span></a>
        </div>
      </div>
    </div>
  );
}
