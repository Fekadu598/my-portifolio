import React, { useState, useEffect } from 'react';
export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];
  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <button className={`nav-toggle${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          <span /><span /><span />
        </button>
        <ul className={`nav-menu${open ? ' open' : ''}`}>
          {links.map((l) => (
            <li key={l.href}><a href={l.href} className="nav-link" onClick={() => setOpen(false)}>{l.label}</a></li>
          ))}
          <li><a href="http://localhost:3001" className="nav-link nav-admin" target="_blank" rel="noreferrer">Admin</a></li>
        </ul>
      </div>
    </nav>
  );
}
