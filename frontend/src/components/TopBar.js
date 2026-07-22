import React, { useState, useEffect } from 'react';

export default function TopBar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');
  const photoUrl = profile?.photo ? `http://localhost:5000${profile.photo}` : null;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];
  return (
    <div className={`topbar${scrolled ? ' scrolled' : ''}`}>
      <div className="topbar-container">
        <a href="#hero" className="topbar-logo-group">
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
            <a key={l.href} href={l.href} className={`topbar-item${active === l.href ? ' active' : ''}`}>{l.label}</a>
          ))}
          <a href="http://localhost:3001" className="topbar-item topbar-admin" target="_blank" rel="noreferrer"><span>Admin</span></a>
        </div>
      </div>
    </div>
  );
}
