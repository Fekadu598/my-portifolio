import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Buttons from './pages/Buttons';
import Inputs from './pages/Inputs';
import Toggles from './pages/Toggles';
import Alerts from './pages/Alerts';
import Colors from './pages/Colors';
import Typography from './pages/Typography';
import './App.css';

export default function App() {
  const [active, setActive] = useState('buttons');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pages = { buttons: <Buttons />, inputs: <Inputs />, toggles: <Toggles />, alerts: <Alerts />, colors: <Colors />, typography: <Typography /> };
  return (
    <div className="ui-app">
      <Sidebar active={active} setActive={setActive} open={sidebarOpen} />
      <main className="ui-main">
        <header className="ui-topbar">
          <button className="ui-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <h2 className="ui-topbar-title">{active.charAt(0).toUpperCase() + active.slice(1)}</h2>
          <div className="ui-topbar-right">
            <div className="ui-topbar-badge">v1.0</div>
            <div className="ui-avatar">FD</div>
          </div>
        </header>
        <div className="ui-content">{pages[active]}</div>
      </main>
      {sidebarOpen && <div className="ui-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
