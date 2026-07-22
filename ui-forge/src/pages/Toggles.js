import React, { useState } from 'react';
const toggleData = [
  { id: 1, title: 'Dark Mode', desc: 'Toggle dark theme across the application' },
  { id: 2, title: 'Email Notifications', desc: 'Receive email for important updates' },
  { id: 3, title: 'Two-Factor Auth', desc: 'Add an extra layer of security' },
  { id: 4, title: 'Auto-save', desc: 'Automatically save changes every 30 seconds' },
];
export default function Toggles() {
  const [toggles, setToggles] = useState({ 1: true, 2: false, 3: true, 4: false });
  const [checks, setChecks] = useState({ a: true, b: false, c: true });
  const [radios, setRadios] = useState('pro');
  const toggle = (id) => setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleCheck = (id) => setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  return (
    <div>
      <div className="ui-section">
        <h3 className="ui-section-title">Toggle Switches</h3>
        <div className="ui-card">
          {toggleData.map(t => (
            <div key={t.id} className="ui-toggle-row">
              <div className={`ui-toggle-track ${toggles[t.id] ? 'on' : ''}`} onClick={() => toggle(t.id)}>
                <div className="ui-toggle-thumb" />
              </div>
              <div>
                <div className="ui-toggle-label">{t.title}</div>
                <div className="ui-toggle-desc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ui-section">
        <h3 className="ui-section-title">Checkboxes</h3>
        <div className="ui-card">
          {['Receive marketing emails', 'Accept terms and conditions', 'Enable beta features'].map((label, i) => {
            const id = Object.keys(checks)[i];
            return (
              <div key={id} className="ui-checkbox-row" onClick={() => toggleCheck(id)}>
                <div className={`ui-checkbox ${checks[id] ? 'checked' : ''}`}>
                  {checks[id] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <span className="ui-checkbox-label">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ui-section">
        <h3 className="ui-section-title">Radio Buttons</h3>
        <div className="ui-card">
          {[{id:'starter',label:'Starter — Free'},{id:'pro',label:'Pro — $19/mo'},{id:'enterprise',label:'Enterprise — $99/mo'}].map(r => (
            <div key={r.id} className="ui-radio-row" onClick={() => setRadios(r.id)}>
              <div className={`ui-radio ${radios === r.id ? 'selected' : ''}`} />
              <span className="ui-checkbox-label">{r.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
