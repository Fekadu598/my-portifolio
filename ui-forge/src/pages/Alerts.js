import React, { useState } from 'react';
export default function Alerts() {
  const [visible, setVisible] = useState({ 1: true, 2: true, 3: true, 4: true });
  const close = (id) => setVisible(prev => ({ ...prev, [id]: false }));
  const alerts = [
    { id: 1, type: 'info', title: 'Information', msg: 'A new software update is available. See what\'s new in version 3.5.' },
    { id: 2, type: 'success', title: 'Success!', msg: 'Your changes have been saved successfully.' },
    { id: 3, type: 'warning', title: 'Warning', msg: 'Your trial expires in 3 days. Please upgrade to continue.' },
    { id: 4, type: 'error', title: 'Error', msg: 'Failed to connect to the server. Please try again later.' },
  ];
  const icons = {
    info: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
    success: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    warning: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    error: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  };
  return (
    <div>
      <div className="ui-section">
        <h3 className="ui-section-title">Alert Variants</h3>
        {alerts.map(a => visible[a.id] && (
          <div key={a.id} className={`ui-alert ui-alert-${a.type}`}>
            <span className="ui-alert-icon">{icons[a.type]}</span>
            <div className="ui-alert-content">
              <div className="ui-alert-title">{a.title}</div>
              <div>{a.msg}</div>
            </div>
            <button className="ui-alert-close" onClick={() => close(a.id)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        ))}
      </div>
      <div className="ui-section">
        <h3 className="ui-section-title">Toast Notifications</h3>
        <div className="ui-card">
          <div className="ui-component-grid">
            <div className="ui-alert ui-alert-info" style={{maxWidth:320,margin:0}}>
              <span className="ui-alert-icon">{icons.info}</span>
              <div className="ui-alert-content"><div className="ui-alert-title">Heads up!</div><div>You can add alerts to your app.</div></div>
            </div>
            <div className="ui-alert ui-alert-success" style={{maxWidth:320,margin:0}}>
              <span className="ui-alert-icon">{icons.success}</span>
              <div className="ui-alert-content"><div className="ui-alert-title">Done!</div><div>Action completed.</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
