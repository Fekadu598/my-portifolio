import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Cursor() {
  const dot = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px'; }
    };
    const enter = () => dot.current && dot.current.classList.add('hovering');
    const leave = () => dot.current && dot.current.classList.remove('hovering');
    document.addEventListener('mousemove', move);
    const targets = document.querySelectorAll('a, button, .skill-card, .hero-social, .contact-social, .btn');
    targets.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
    return () => { document.removeEventListener('mousemove', move); };
  }, []);
  return <div className="cursor" ref={dot} />;
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
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    const timer = setTimeout(() => { document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el)); }, 100);
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
      <Cursor />
      <DynamicBackground />
      <div className="grain" />
      <TopBar />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Contact api={API} />
      </main>
      <Footer profile={profile} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PortfolioSite />} />
      </Routes>
    </BrowserRouter>
  );
}
