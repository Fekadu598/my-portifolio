import React, { useEffect, useRef, useState } from 'react';

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

const testimonials = [
  {
    text: "Fekadu delivered an exceptional product that exceeded our expectations. His attention to detail and technical skills are outstanding.",
    name: "Sarah Chen",
    role: "CTO, TechCorp",
  },
  {
    text: "Working with Fekadu was a game-changer. He transformed our vision into a stunning, high-performance application.",
    name: "Marcus Johnson",
    role: "Founder, StartupXYZ",
  },
  {
    text: "His ability to solve complex problems while maintaining clean code is remarkable. Highly recommend for any project.",
    name: "Emily Rodriguez",
    role: "Product Lead, InnovateLab",
  },
];

const showcaseItems = [
  { title: 'E-Commerce Platform', category: 'Full Stack', gradient: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(74,158,255,0.1))' },
  { title: 'Analytics Dashboard', category: 'Frontend', gradient: 'linear-gradient(135deg, rgba(74,158,255,0.12), rgba(123,184,255,0.08))' },
  { title: 'Mobile App', category: 'React Native', gradient: 'linear-gradient(135deg, rgba(29,78,216,0.12), rgba(74,158,255,0.1))' },
  { title: 'API Platform', category: 'Backend', gradient: 'linear-gradient(135deg, rgba(123,184,255,0.1), rgba(37,99,235,0.12))' },
  { title: 'SaaS Dashboard', category: 'Full Stack', gradient: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(74,158,255,0.08))' },
  { title: 'Portfolio Site', category: 'Frontend', gradient: 'linear-gradient(135deg, rgba(74,158,255,0.1), rgba(29,78,216,0.1))' },
];

function AnimatedStat({ target, suffix = '+', label }) {
  const ref = useRef(null);
  const animated = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 2000, start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 5);
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
    <div className="home-stat fade-in" ref={ref}>
      <div className="home-stat-value">
        <span className="home-stat-number">{count}</span>
        <span className="home-stat-suffix">{suffix}</span>
      </div>
      <span className="home-stat-label">{label}</span>
    </div>
  );
}

export default function Home({ projects }) {
  const featured = (projects || []).slice(0, 3);

  return (
    <>
      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span className="marquee-item" key={i}>
              {word}<span className="dot" />
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="section home-stats-section">
        <div className="home-stats-grid">
          <AnimatedStat target={50} suffix="+" label="Projects Completed" />
          <AnimatedStat target={3} suffix="+" label="Years Experience" />
          <AnimatedStat target={30} suffix="+" label="Happy Clients" />
          <AnimatedStat target={99} suffix="%" label="Satisfaction" />
        </div>
      </section>

      {/* Services */}
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

      {/* Featured Work */}
      <section className="section home-featured">
        <div className="fade-in">
          <div className="section-divider" />
          <span className="section-label">Work</span>
          <h2 className="section-title">Featured <span className="highlight">projects</span></h2>
          <p className="section-desc">A selection of my recent work.</p>
        </div>
        <div className="home-featured-grid">
          {featured.map((p, i) => (
            <a href="#projects" className="home-featured-card fade-in" key={p._id || i} style={{ transitionDelay: `${i * 0.12}s` }}>
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
            </a>
          ))}
        </div>
        <div className="fade-in" style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#projects" className="btn btn-lg btn-ghost">View All Projects</a>
        </div>
      </section>

      {/* Showcase / Gallery */}
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

      {/* Testimonials */}
      <section className="section home-testimonials">
        <div className="fade-in">
          <div className="section-divider" />
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What people <span className="highlight">say</span></h2>
          <p className="section-desc">Feedback from clients and collaborators.</p>
        </div>
        <div className="home-testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="home-testimonial-card fade-in" key={t.name} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="home-testimonial-quote">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--blue)', opacity: 0.4 }}>
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 .001 0 1.003 1 1.003z" />
                </svg>
              </div>
              <p className="home-testimonial-text">{t.text}</p>
              <div className="home-testimonial-author">
                <div className="home-testimonial-avatar">
                  <span>{t.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <div className="home-testimonial-name">{t.name}</div>
                  <div className="home-testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By */}
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

      {/* CTA */}
      <div className="home-cta-strip fade-in">
        <div className="home-cta-inner">
          <span className="home-cta-text">Have a project in mind?</span>
          <a href="#contact" className="btn btn-lg btn-primary"><span>Let's Talk</span></a>
        </div>
      </div>
    </>
  );
}
