import React from 'react';
const colors = [
  { name: 'Purple 500', hex: '#a855f7', bg: '#a855f7' },
  { name: 'Purple 600', hex: '#9333ea', bg: '#9333ea' },
  { name: 'Purple 700', hex: '#7c3aed', bg: '#7c3aed' },
  { name: 'Pink 500', hex: '#ec4899', bg: '#ec4899' },
  { name: 'Fuchsia 500', hex: '#d946ef', bg: '#d946ef' },
  { name: 'Indigo 500', hex: '#6366f1', bg: '#6366f1' },
  { name: 'Emerald 500', hex: '#10b981', bg: '#10b981' },
  { name: 'Teal 500', hex: '#14b8a6', bg: '#14b8a6' },
  { name: 'Cyan 500', hex: '#06b6d4', bg: '#06b6d4' },
  { name: 'Amber 500', hex: '#f59e0b', bg: '#f59e0b' },
  { name: 'Red 500', hex: '#ef4444', bg: '#ef4444' },
  { name: 'Slate 800', hex: '#1e293b', bg: '#1e293b' },
];
const neutral = [
  { name: 'White', hex: '#ffffff', bg: '#ffffff' },
  { name: 'Slate 100', hex: '#f1f5f9', bg: '#f1f5f9' },
  { name: 'Slate 300', hex: '#cbd5e1', bg: '#cbd5e1' },
  { name: 'Slate 500', hex: '#64748b', bg: '#64748b' },
  { name: 'Slate 700', hex: '#334155', bg: '#334155' },
  { name: 'Slate 900', hex: '#0f172a', bg: '#0f172a' },
];
const Swatch = ({ c }) => (
  <div className="ui-color-swatch">
    <div className="ui-color-preview" style={{ background: c.bg }} />
    <div className="ui-color-info">
      <div className="ui-color-name">{c.name}</div>
      <div className="ui-color-hex">{c.hex}</div>
    </div>
  </div>
);
export default function Colors() {
  return (
    <div>
      <div className="ui-section">
        <h3 className="ui-section-title">Brand Colors</h3>
        <div className="ui-color-grid">{colors.map(c => <Swatch key={c.hex} c={c} />)}</div>
      </div>
      <div className="ui-section">
        <h3 className="ui-section-title">Neutral Palette</h3>
        <div className="ui-color-grid">{neutral.map(c => <Swatch key={c.hex} c={c} />)}</div>
      </div>
    </div>
  );
}
