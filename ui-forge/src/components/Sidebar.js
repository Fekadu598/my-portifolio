import React from 'react';
const navItems = [
  { id: 'buttons', label: 'Buttons', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="8" rx="2"/><path d="M12 8v8"/></svg> },
  { id: 'inputs', label: 'Inputs', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h4M7 13h8"/></svg> },
  { id: 'toggles', label: 'Toggles', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg> },
  { id: 'alerts', label: 'Alerts', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  { id: 'colors', label: 'Colors', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> },
  { id: 'typography', label: 'Typography', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg> },
];
export default function Sidebar({ active, setActive, open }) {
  return (
    <aside className={`ui-sidebar ${open ? 'ui-sidebar-open' : ''}`}>
      <div className="ui-sidebar-brand">
        <div className="ui-brand-icon">UF</div>
        <span className="ui-brand-text">UI Forge</span>
      </div>
      <nav className="ui-sidebar-nav">
        {navItems.map((item) => (
          <button key={item.id} className={`ui-nav-item ${active === item.id ? 'ui-nav-item-active' : ''}`} onClick={() => setActive(item.id)}>
            {item.icon}<span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="ui-sidebar-footer">
        <div className="ui-sidebar-user">
          <div className="ui-sidebar-avatar">FD</div>
          <div><div className="ui-sidebar-user-name">Fekadu D.</div><div className="ui-sidebar-user-role">Designer</div></div>
        </div>
      </div>
    </aside>
  );
}
