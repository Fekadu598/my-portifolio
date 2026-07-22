import React from 'react';
import Projects from '../components/Projects';

const showcaseItems = [
  { title: 'E-Commerce Platform', category: 'Full Stack', gradient: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(74,158,255,0.1))' },
  { title: 'Analytics Dashboard', category: 'Frontend', gradient: 'linear-gradient(135deg, rgba(74,158,255,0.12), rgba(123,184,255,0.08))' },
  { title: 'Mobile App', category: 'React Native', gradient: 'linear-gradient(135deg, rgba(29,78,216,0.12), rgba(74,158,255,0.1))' },
  { title: 'API Platform', category: 'Backend', gradient: 'linear-gradient(135deg, rgba(123,184,255,0.1), rgba(37,99,235,0.12))' },
  { title: 'SaaS Dashboard', category: 'Full Stack', gradient: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(74,158,255,0.08))' },
  { title: 'Portfolio Site', category: 'Frontend', gradient: 'linear-gradient(135deg, rgba(74,158,255,0.1), rgba(29,78,216,0.1))' },
];

export default function WorkPage({ projects }) {
  const featured = (projects || []).slice(0, 3);

  return (
    <>
      <section className="section home-featured" style={{ paddingTop: '160px' }}>
        <div className="fade-in">
          <div className="section-divider" />
          <span className="section-label">Featured</span>
          <h2 className="section-title">Selected <span className="highlight">work</span></h2>
          <p className="section-desc">A selection of my recent work.</p>
        </div>
        <div className="home-featured-grid">
          {featured.map((p, i) => (
            <div className="home-featured-card fade-in" key={p._id || i} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="home-featured-img" style={{ background: `linear-gradient(135deg, rgba(37,99,235,${0.12 - i * 0.02}), rgba(74,158,255,${0.08 - i * 0.01}))` }}>
                <div className="home-featured-shimmer" />
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" style={{ color: 'rgba(74,158,255,0.2)', position: 'relative', zIndex: 1 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
                </svg>
              </div>
              <div className="home-featured-info">
                <span className="home-featured-num">0{i + 1}</span>
                <h3 className="home-featured-title">{p.title}</h3>
                <div className="home-featured-tags">
                  {p.tags.slice(0, 3).map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Projects projects={projects} />

      <section className="section home-showcase">
        <div className="fade-in">
          <div className="section-divider" />
          <span className="section-label">Showcase</span>
          <h2 className="section-title">Creative <span className="highlight">gallery</span></h2>
          <p className="section-desc">A glimpse into my design process and creative work.</p>
        </div>
        <div className="home-showcase-grid">
          {showcaseItems.map((item, i) => (
            <div className="home-showcase-card fade-in" key={item.title} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="home-showcase-bg" style={{ background: item.gradient }}>
                <div className="home-showcase-shimmer" />
              </div>
              <div className="home-showcase-info">
                <span className="home-showcase-cat">{item.category}</span>
                <h4 className="home-showcase-title">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
