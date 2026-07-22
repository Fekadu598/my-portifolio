import React, { useEffect, useRef, useState } from 'react';

function AnimatedNumber({ target, suffix = '+' }) {
  const ref = useRef(null);
  const animated = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 2400, start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 6);
          setCount(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-value" ref={ref}>
      <span className="stat-number">{count}</span>
      <span className="stat-suffix">{suffix}</span>
    </div>
  );
}

export default function About({ profile }) {
  const bio = profile?.bio || "I'm a passionate developer who loves turning complex problems into simple, elegant solutions. With a keen eye for design and a commitment to clean code, I build applications that are both functional and delightful to use.";
  const photoUrl = profile?.photo ? `http://localhost:5000${profile.photo}` : '';
  const stats = [
    { target: profile?.stats?.yearsExperience || 3, suffix: '+', label: 'Years Experience' },
    { target: profile?.stats?.projectsCompleted || 20, suffix: '+', label: 'Projects Completed' },
    { target: profile?.stats?.happyClients || 15, suffix: '+', label: 'Happy Clients' },
  ];

  return (
    <section className="section" id="about">
      <div className="fade-in">
        <div className="section-divider" />
        <span className="section-label">About</span>
        <h2 className="section-title">A bit about <span className="highlight">me</span></h2>
      </div>
      <div className="about-grid">
        <div className="about-photo fade-in">
          <div className="about-photo-frame">
            {photoUrl ? <img src={photoUrl} alt="Profile" /> : (
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(74,158,255,0.06), rgba(123,184,255,0.04))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at 35% 40%, rgba(74,158,255,0.12), transparent 55%)'
                }} />
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"
                  style={{ color: '#4a9eff', opacity: 0.15, position: 'relative', zIndex: 1 }}>
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
            <div className="about-photo-overlay" />
          </div>
          <div className="about-photo-ring" />
          <div className="about-photo-ring" />
          <div className="about-photo-accent" />
        </div>
        <div className="about-text fade-in">
          <h3>I'm <span>{profile?.name || 'Fekadu'}</span></h3>
          <p>{bio}</p>
          <p style={{ color: 'var(--gray-400)', fontSize: '1.02rem', lineHeight: 1.95 }}>
            When I'm not coding, you'll find me exploring new technologies, contributing to
            open-source, or sharing knowledge with the developer community.
          </p>
          <div className="about-stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <AnimatedNumber target={s.target} suffix={s.suffix} />
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
