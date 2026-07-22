import React from 'react';
export default function Inputs() {
  return (
    <div>
      <div className="ui-section">
        <h3 className="ui-section-title">Text Inputs</h3>
        <div className="ui-card">
          <div className="ui-input-group">
            <label className="ui-label">Default</label>
            <input className="ui-input" type="text" placeholder="Enter text..." />
          </div>
          <div className="ui-input-group">
            <label className="ui-label">With Error</label>
            <input className="ui-input ui-input-error" type="text" value="Invalid input" />
            <span className="ui-input-error-text">This field is required</span>
          </div>
          <div className="ui-input-group">
            <label className="ui-label">With Success</label>
            <input className="ui-input ui-input-success" type="text" value="Valid input" />
            <span className="ui-input-hint" style={{color:'#06d6a0'}}>Looks good!</span>
          </div>
          <div className="ui-input-group">
            <label className="ui-label">Disabled</label>
            <input className="ui-input" type="text" placeholder="Disabled" disabled style={{opacity:0.5}} />
          </div>
        </div>
      </div>
      <div className="ui-section">
        <h3 className="ui-section-title">Textarea</h3>
        <div className="ui-card">
          <div className="ui-input-group">
            <label className="ui-label">Message</label>
            <textarea className="ui-input ui-textarea" placeholder="Write your message..."></textarea>
          </div>
        </div>
      </div>
      <div className="ui-section">
        <h3 className="ui-section-title">Select</h3>
        <div className="ui-card">
          <div className="ui-input-group">
            <label className="ui-label">Choose Plan</label>
            <select className="ui-input ui-select">
              <option>Starter</option>
              <option>Pro</option>
              <option>Enterprise</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
