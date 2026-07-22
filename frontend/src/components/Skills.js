import React from 'react';
const iconMap = {
  code: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
  layers: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>),
  server: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
  type: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7V4h16v3" /><path d="M9 20h6" /><path d="M12 4v16" /></svg>),
  cpu: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>),
  database: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3c-4.97 0-9 4.03-9 9v7h18v-7c0-4.97-4.03-9-9-9z" /><path d="M10 21v-4a2 2 0 114 0v4" /></svg>),
  'check-circle': (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>),
  book: (<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>),
};
export default function Skills({ skills }) {
  return (
    <section className="section" id="skills">
      <div className="fade-in">
        <span className="section-label">Skills</span>
        <h2 className="section-title">Technologies I use</h2>
        <p className="section-desc">Tools and technologies I work with daily.</p>
      </div>
      <div className="skills-grid">
        {skills.map((s) => (
          <div className="skill-card fade-in" key={s._id}>
            <div className="skill-icon">{iconMap[s.icon] || iconMap.code}</div>
            <span className="skill-name">{s.name}</span>
            <div className="skill-level">
              <div className="skill-level-bar" style={{ width: `${s.level || 80}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
