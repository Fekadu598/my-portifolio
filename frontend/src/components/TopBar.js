import React, { useState, useEffect } from 'react';
export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
        <a href="#hero" className="topbar-logo">alex.dev</a>
        <div className="topbar-right">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="topbar-item">{l.label}</a>
          ))}
          <a href="http://localhost:3001" className="topbar-item topbar-admin" target="_blank" rel="noreferrer"><span>Admin</span></a>
        </div>
      </div>
    </div>
  );
}
