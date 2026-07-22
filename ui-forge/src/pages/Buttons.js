import React from 'react';
export default function Buttons() {
  return (
    <div>
      <div className="ui-section">
        <h3 className="ui-section-title">Button Variants</h3>
        <p className="ui-section-desc">Different visual styles for different contexts.</p>
        <div className="ui-card">
          <div className="ui-flex">
            <button className="ui-btn ui-btn-primary">Primary</button>
            <button className="ui-btn ui-btn-secondary">Secondary</button>
            <button className="ui-btn ui-btn-outline">Outline</button>
            <button className="ui-btn ui-btn-ghost">Ghost</button>
            <button className="ui-btn ui-btn-danger">Danger</button>
            <button className="ui-btn ui-btn-success">Success</button>
          </div>
        </div>
      </div>
      <div className="ui-section">
        <h3 className="ui-section-title">Button Sizes</h3>
        <p className="ui-section-desc">Small, default, and large sizing options.</p>
        <div className="ui-card">
          <div className="ui-flex">
            <button className="ui-btn ui-btn-primary ui-btn-sm">Small</button>
            <button className="ui-btn ui-btn-primary">Default</button>
            <button className="ui-btn ui-btn-primary ui-btn-lg">Large</button>
          </div>
        </div>
      </div>
      <div className="ui-section">
        <h3 className="ui-section-title">Icon Buttons</h3>
        <p className="ui-section-desc">Buttons with only icons for compact UIs.</p>
        <div className="ui-card">
          <div className="ui-flex">
            <button className="ui-btn ui-btn-primary ui-btn-icon-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            </button>
            <button className="ui-btn ui-btn-secondary ui-btn-icon-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
            <button className="ui-btn ui-btn-outline ui-btn-icon-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button className="ui-btn ui-btn-danger ui-btn-icon-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div className="ui-section">
        <h3 className="ui-section-title">Disabled State</h3>
        <p className="ui-section-desc">Non-interactive buttons for loading or unavailable actions.</p>
        <div className="ui-card">
          <div className="ui-flex">
            <button className="ui-btn ui-btn-primary" disabled>Primary</button>
            <button className="ui-btn ui-btn-secondary" disabled>Secondary</button>
            <button className="ui-btn ui-btn-outline" disabled>Outline</button>
          </div>
        </div>
      </div>
    </div>
  );
}
