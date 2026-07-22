import React from 'react';
import Contact from '../components/Contact';

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

export default function ContactPage({ api }) {
  return (
    <>
      <Contact api={api} />

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
    </>
  );
}
