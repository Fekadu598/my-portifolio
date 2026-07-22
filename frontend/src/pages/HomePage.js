import React, { useEffect, useRef, useState } from 'react';

const marqueeWords = [
  'React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL',
  'Next.js', 'Tailwind', 'Docker', 'AWS', 'GraphQL',
  'Python', 'Redis', 'REST API', 'Git', 'Figma',
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

export default function HomePage() {
  return (
    <>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span className="marquee-item" key={i}>
              {word}<span className="dot" />
            </span>
          ))}
        </div>
      </div>

      <section className="section home-stats-section">
        <div className="home-stats-grid">
          <AnimatedStat target={50} suffix="+" label="Projects Completed" />
          <AnimatedStat target={3} suffix="+" label="Years Experience" />
          <AnimatedStat target={30} suffix="+" label="Happy Clients" />
          <AnimatedStat target={99} suffix="%" label="Satisfaction" />
        </div>
      </section>

      <div className="home-cta-strip fade-in">
        <div className="home-cta-inner">
          <span className="home-cta-text">Have a project in mind?</span>
          <a href="/contact" className="btn btn-lg btn-primary"><span>Let's Talk</span></a>
        </div>
      </div>
    </>
  );
}
