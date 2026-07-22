import React, { useState, useEffect, useRef } from 'react';

const iconMap = {
  code: (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
  layers: (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>),
  server: (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
  type: (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" /></svg>),
  cpu: (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>),
  database: (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-4.97 0-9 4.03-9 9v7h18v-7c0-4.97-4.03-9-9-9z" /><path d="M10 21v-4a2 2 0 114 0v4" /></svg>),
  'check-circle': (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>),
  book: (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>),
};

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const [barWidth, setBarWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        setTimeout(() => setBarWidth(skill.level || 80), 250 + index * 90);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [skill.level, isVisible, index]);

  return (
    <div className="skill-card fade-in" ref={ref} style={{ transitionDelay: `${index * 0.07}s` }}>
      <div className="skill-card-glow" />
      <div className="skill-icon">{iconMap[skill.icon] || iconMap.code}</div>
      <span className="skill-name">{skill.name}</span>
      <div className="skill-level">
        <div className="skill-level-bar" style={{ width: isVisible ? `${barWidth}%` : '0%' }} />
      </div>
    </div>
  );
}

export default function Skills({ skills }) {
  return (
    <section className="section" id="skills">
      <div className="fade-in">
        <div className="section-divider" />
        <span className="section-label">Skills</span>
        <h2 className="section-title">Technologies <span className="highlight">I use</span></h2>
        <p className="section-desc">Tools and technologies I work with daily.</p>
      </div>
      <div className="skills-grid">
        {skills.map((s, i) => (
          <SkillCard key={s._id} skill={s} index={i} />
        ))}
      </div>
    </section>
  );
}
