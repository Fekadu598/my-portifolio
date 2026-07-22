import React from 'react';
const gradients = [
  'linear-gradient(135deg, rgba(96,165,250,0.12), rgba(147,197,253,0.08))',
  'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(96,165,250,0.08))',
  'linear-gradient(135deg, rgba(147,197,253,0.1), rgba(59,130,246,0.06))',
  'linear-gradient(135deg, rgba(96,165,250,0.08), rgba(147,197,253,0.12))',
];
export default function Projects({ projects }) {
  return (
    <div className="projects-section" id="projects">
      <div className="projects-inner">
        <div className="fade-in">
          <span className="section-label">Work</span>
          <h2 className="section-title">Featured projects</h2>
          <p className="section-desc">A selection of projects I've built with care.</p>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <article className="project-card fade-in" key={p._id}>
              <div className="project-image">
                <div className="project-image-bg" style={{ background: gradients[i % gradients.length] }} />
                <div className="project-image-shimmer" />
                <div className="project-icon">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
              </div>
              <div className="project-info">
                <span className="project-num">Project {String(i + 1).padStart(2, '0')}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (<span className="project-tag" key={t}>{t}</span>))}
                </div>
                <div className="project-links">
                  {p.liveUrl && <a href={p.liveUrl} className="btn btn-sm btn-primary"><span>Live Demo</span></a>}
                  {p.sourceUrl && <a href={p.sourceUrl} className="btn btn-sm btn-ghost">Source</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
