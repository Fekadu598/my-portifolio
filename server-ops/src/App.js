import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ApiMonitor from './pages/ApiMonitor';
import Database from './pages/Database';
import Logs from './pages/Logs';
import './App.css';

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pages = { dashboard: <Dashboard />, api: <ApiMonitor />, database: <Database />, logs: <Logs /> };
  return (
    <div className="ops-app">
      <Sidebar active={active} setActive={setActive} open={sidebarOpen} />
      <main className="ops-main">
        <header className="ops-topbar">
          <button className="ops-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <h2 className="ops-topbar-title">{active.charAt(0).toUpperCase() + active.slice(1)}</h2>
          <div className="ops-topbar-right">
            <div className="ops-status-dot ops-pulse"></div>
            <span className="ops-status-text">All Systems Operational</span>
            <div className="ops-avatar">FD</div>
          </div>
        </header>
        <div className="ops-content">{pages[active]}</div>
      </main>
      {sidebarOpen && <div className="ops-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
