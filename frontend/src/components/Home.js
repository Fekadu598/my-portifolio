import React from 'react';

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
      </svg>
    ),
    title: 'Web Development',
    desc: 'Building fast, responsive web applications with modern frameworks and clean architecture.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Full-Stack Apps',
    desc: 'End-to-end solutions from database design to polished frontend interfaces.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'Crafting intuitive interfaces with attention to detail and user-centered design principles.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Performance',
    desc: 'Optimizing load times, bundle sizes, and runtime performance for lightning-fast experiences.',
  },
];

const marqueeWords = [
  'React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL',
  'Next.js', 'Tailwind', 'Docker', 'AWS', 'GraphQL',
  'Python', 'Redis', 'REST API', 'Git', 'Figma',
];

export default function Home() {
  return (
    <>
      {/* Marquee Divider */}
      <div className="marquee-container">
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span className="marquee-item" key={i}>
              {word}<span className="dot" />
            </span>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="section home-services">
        <div className="fade-in">
          <div className="section-divider" />
          <span className="section-label">Services</span>
          <h2 className="section-title">What I <span className="highlight">do</span></h2>
          <p className="section-desc">Delivering end-to-end solutions with precision and craft.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card fade-in" key={s.title} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-line" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
      <div className="home-cta-strip fade-in">
        <div className="home-cta-inner">
          <span className="home-cta-text">Have a project in mind?</span>
          <a href="#contact" className="btn btn-lg btn-primary"><span>Let's Talk</span></a>
        </div>
      </div>
    </>
  );
}
