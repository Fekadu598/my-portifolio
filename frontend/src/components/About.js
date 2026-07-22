import React, { useEffect, useRef } from 'react';
function AnimatedNumber({ target }) {
  const ref = useRef(null);
  const animated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 1800, start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span className="stat-number" ref={ref}>0</span>;
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
        <span className="section-label">About</span>
        <h2 className="section-title">A bit about me</h2>
      </div>
      <div className="about-grid">
        <div className="about-photo fade-in">
          <div className="about-photo-frame">
            {photoUrl ? <img src={photoUrl} alt="Profile" /> : (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(96,165,250,0.1), rgba(147,197,253,0.06))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ color: '#525252', opacity: 0.2 }}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
            )}
            <div className="about-photo-overlay" />
          </div>
          <div className="about-photo-accent" />
        </div>
        <div className="about-text fade-in">
          <h3>I'm <span>{profile?.name || 'Developer'}</span></h3>
          <p>{bio}</p>
          <p style={{ color: 'var(--gray-400)', fontSize: '1.05rem', lineHeight: 1.85 }}>When I'm not coding, you'll find me exploring new technologies, contributing to open-source, or sharing knowledge with the developer community.</p>
          <div className="about-stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <AnimatedNumber target={s.target} /><span className="stat-suffix">{s.suffix}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
