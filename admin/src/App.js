import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Charts from './pages/Charts';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Users from './pages/Users';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || sessionStorage.getItem('token'));
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .catch(() => { localStorage.removeItem('token'); sessionStorage.removeItem('token'); setToken(null); });
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setActive('overview');
  };

  if (!token) return <Login onLogin={setToken} />;

  const pages = {
    overview: <Overview token={token} setActive={setActive} />,
    charts: <Charts token={token} />,
    projects: <Projects token={token} />,
    blog: <Blog token={token} />,
    users: <Users token={token} />,
    messages: <Messages token={token} />,
    settings: <Settings token={token} />,
  };

  return (
    <div className="admin-app">
      <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} onLogout={handleLogout} />
      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <h2 className="admin-topbar-title">{active.charAt(0).toUpperCase() + active.slice(1)}</h2>
          <div className="admin-topbar-right">
            <a href="http://localhost:3000" target="_blank" rel="noreferrer" style={{ fontSize: '0.82rem', color: '#06d6a0', textDecoration: 'none', fontWeight: 600 }}>View Site</a>
            <div className="admin-notification-bell">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="admin-notification-dot"></span>
            </div>
            <div className="admin-avatar" style={{ overflow: 'hidden', padding: 0 }}>
              <img src={`${API}/uploads/profile-1784661835662.png`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </header>
        <div className="admin-content">{pages[active]}</div>
      </main>
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
