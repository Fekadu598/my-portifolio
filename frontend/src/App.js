import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Cursor() {
  const dot = useRef(null);
  const trail = useRef(null);
  const label = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf;
    const animate = () => {
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.08;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.08;
      if (trail.current) {
        trail.current.style.left = trailPos.current.x + 'px';
        trail.current.style.top = trailPos.current.y + 'px';
      }
      if (label.current) {
        label.current.style.left = pos.current.x + 'px';
        label.current.style.top = (pos.current.y + 48) + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const move = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px';
        dot.current.style.top = e.clientY + 'px';
        pos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const enter = (e) => {
      dot.current?.classList.add('hovering');
      trail.current?.classList.add('hovering');
      const lbl = e.currentTarget?.getAttribute('data-cursor');
      if (label.current && lbl) {
        label.current.textContent = lbl;
        label.current.classList.add('visible');
      }
    };
    const leave = () => {
      dot.current?.classList.remove('hovering');
      trail.current?.classList.remove('hovering');
      label.current?.classList.remove('visible');
    };

    document.addEventListener('mousemove', move);
    raf = requestAnimationFrame(animate);

    const targets = document.querySelectorAll('a, button, .skill-card, .hero-social, .contact-social, .btn, .project-card');
    targets.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dot} />
      <div className="cursor-trail" ref={trail} />
      <div className="cursor-label" ref={label} />
    </>
  );
}

function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`scroll-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

function Loader() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`loader${hidden ? ' hidden' : ''}`}>
      <div className="loader-content">
        <div className="loader-brand">fekadu.</div>
        <div className="loader-track">
          <div className="loader-bar" />
        </div>
        <div className="loader-text">Building experience</div>
      </div>
    </div>
  );
}

function DynamicBackground() {
  return (
    <div className="dynamic-bg">
      <div className="dynamic-bg-orb" />
      <div className="dynamic-bg-orb" />
      <div className="dynamic-bg-orb" />
    </div>
  );
}

function useScrollFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -60px 0px' }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    }, 100);
    return () => { clearTimeout(timer); observer.disconnect(); };
  });
}

function PortfolioSite() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState(null);
  useScrollFadeIn();
  useEffect(() => {
    fetch(`${API}/api/projects`).then((res) => res.json()).then(setProjects).catch(console.error);
    fetch(`${API}/api/skills`).then((res) => res.json()).then(setSkills).catch(console.error);
    fetch(`${API}/api/profile`).then((res) => res.json()).then(setProfile).catch(console.error);
  }, []);
  return (
    <>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <ScrollToTop />
      <DynamicBackground />
      <div className="grain" />
      <TopBar profile={profile} />
      <main>
        <Routes>
          <Route path="/" element={<><Hero profile={profile} /><HomePage /></>} />
          <Route path="/about" element={<AboutPage profile={profile} />} />
          <Route path="/work" element={<WorkPage projects={projects} />} />
          <Route path="/skills" element={<SkillsPage skills={skills} />} />
          <Route path="/contact" element={<ContactPage api={API} />} />
          <Route path="*" element={<><Hero profile={profile} /><HomePage /></>} />
        </Routes>
      </main>
      <Footer profile={profile} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioSite />
    </BrowserRouter>
  );
}
