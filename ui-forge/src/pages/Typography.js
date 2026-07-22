import React from 'react';
const specs = [
  { label: 'Display', size: '3rem', weight: 800, text: 'The quick brown fox', family: 'Inter' },
  { label: 'Heading 1', size: '2.25rem', weight: 700, text: 'The quick brown fox jumps', family: 'Inter' },
  { label: 'Heading 2', size: '1.875rem', weight: 700, text: 'The quick brown fox jumps over', family: 'Inter' },
  { label: 'Heading 3', size: '1.5rem', weight: 600, text: 'The quick brown fox jumps over the', family: 'Inter' },
  { label: 'Heading 4', size: '1.25rem', weight: 600, text: 'The quick brown fox jumps over the lazy', family: 'Inter' },
  { label: 'Body Large', size: '1.125rem', weight: 400, text: 'The quick brown fox jumps over the lazy dog', family: 'Inter' },
  { label: 'Body', size: '1rem', weight: 400, text: 'The quick brown fox jumps over the lazy dog', family: 'Inter' },
  { label: 'Body Small', size: '0.875rem', weight: 400, text: 'The quick brown fox jumps over the lazy dog', family: 'Inter' },
  { label: 'Caption', size: '0.75rem', weight: 500, text: 'The quick brown fox jumps over the lazy dog', family: 'Inter' },
  { label: 'Code', size: '0.875rem', weight: 400, text: 'const greeting = "Hello, World!";', family: 'JetBrains Mono' },
];
export default function Typography() {
  return (
    <div>
      <div className="ui-section">
        <h3 className="ui-section-title">Type Scale</h3>
        <div className="ui-card">
          {specs.map(s => (
            <div key={s.label} className="ui-type-row">
              <div className="ui-type-label">{s.label} — {s.size} / {s.weight}</div>
              <div className="ui-type-specimen" style={{ fontSize: s.size, fontWeight: s.weight, fontFamily: s.family }}>{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
