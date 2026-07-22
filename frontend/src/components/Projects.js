import React, { useRef, useState, useCallback } from 'react';

const gradients = [
  'linear-gradient(135deg, rgba(29,78,216,0.12), rgba(74,158,255,0.08))',
  'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(123,184,255,0.06))',
  'linear-gradient(135deg, rgba(74,158,255,0.1), rgba(29,78,216,0.06))',
  'linear-gradient(135deg, rgba(123,184,255,0.08), rgba(37,99,235,0.1))',
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * -5;
    setSpot({ x, y, active: true });
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpot(s => ({ ...s, active: false }));
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <article
      className="project-card fade-in"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--spot-x': `${spot.x}%`,
        '--spot-y': `${spot.y}%`,
        '--spot-opacity': spot.active ? 1 : 0,
        transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${spot.active ? -12 : 0}px)`,
      }}
    >
      <div className="project-image">
        <div className="project-image-bg" style={{ background: gradients[index % gradients.length] }} />
        <div className="project-spotlight" />
        <div className="project-image-shimmer" />
        <div className="project-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
        </div>
      </div>
      <div className="project-info">
        <span className="project-num">Project {String(index + 1).padStart(2, '0')}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((t) => (<span className="project-tag" key={t}>{t}</span>))}
        </div>
        <div className="project-links">
          {project.liveUrl && <a href={project.liveUrl} className="btn btn-sm btn-primary" data-cursor="Demo"><span>Live Demo</span></a>}
          {project.sourceUrl && <a href={project.sourceUrl} className="btn btn-sm btn-ghost" data-cursor="Code">Source</a>}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ projects }) {
  return (
    <div className="projects-section" id="projects">
      <div className="projects-inner">
        <div className="fade-in">
          <div className="section-divider" />
          <span className="section-label">Work</span>
          <h2 className="section-title">Featured <span className="highlight">projects</span></h2>
          <p className="section-desc">A selection of projects I've built with care.</p>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p._id} project={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
