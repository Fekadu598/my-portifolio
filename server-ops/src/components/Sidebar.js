import React from 'react';
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { id: 'api', label: 'API Monitor', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
  { id: 'database', label: 'Database', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
  { id: 'logs', label: 'Logs', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
];
export default function Sidebar({ active, setActive, open }) {
  return (
    <aside className={`ops-sidebar ${open ? 'ops-sidebar-open' : ''}`}>
      <div className="ops-sidebar-brand">
        <div className="ops-brand-icon">SO</div>
        <span className="ops-brand-text">Server Ops</span>
      </div>
      <nav className="ops-sidebar-nav">
        {navItems.map((item) => (
          <button key={item.id} className={`ops-nav-item ${active === item.id ? 'ops-nav-item-active' : ''}`} onClick={() => setActive(item.id)}>
            {item.icon}<span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="ops-sidebar-footer">
        <div className="ops-sidebar-user">
          <div className="ops-sidebar-avatar">FD</div>
          <div><div className="ops-sidebar-user-name">Fekadu D.</div><div className="ops-sidebar-user-role">DevOps</div></div>
        </div>
      </div>
    </aside>
  );
}
