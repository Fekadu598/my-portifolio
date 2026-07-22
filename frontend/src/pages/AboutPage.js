import React from 'react';
import About from '../components/About';

const services = [
  {
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>),
    title: 'Web Development',
    desc: 'Building fast, responsive web applications with modern frameworks and clean architecture.',
  },
  {
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>),
    title: 'Full-Stack Apps',
    desc: 'End-to-end solutions from database design to polished frontend interfaces.',
  },
  {
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>),
    title: 'UI/UX Design',
    desc: 'Crafting intuitive interfaces with attention to detail and user-centered design principles.',
  },
  {
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>),
    title: 'Performance',
    desc: 'Optimizing load times, bundle sizes, and runtime performance for lightning-fast experiences.',
  },
];

const clients = [
  { name: 'Google', color: '#4285f4' },
  { name: 'Microsoft', color: '#00a4ef' },
  { name: 'Amazon', color: '#ff9900' },
  { name: 'Meta', color: '#0668e1' },
  { name: 'Apple', color: '#a2aaad' },
  { name: 'Netflix', color: '#e50914' },
  { name: 'Spotify', color: '#1db954' },
  { name: 'Stripe', color: '#635bff' },
];

export default function AboutPage({ profile }) {
  return (
    <>
      <About profile={profile} />

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

      <section className="section home-trusted">
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>Trusted by</span>
          <p className="section-desc" style={{ margin: '0 auto' }}>Companies and teams I've had the pleasure of working with.</p>
        </div>
        <div className="home-clients-grid">
          {clients.map((c, i) => (
            <div className="home-client-logo fade-in" key={c.name} style={{ transitionDelay: `${i * 0.06}s` }}>
              <span className="home-client-name" style={{ color: c.color }}>{c.name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
