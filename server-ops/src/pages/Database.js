import React, { useState } from 'react';
const tables = [
  { name: 'users', rows: 12847, size: '24.3 MB', indexes: 4, queries: '1.2k/s', growth: '+12%' },
  { name: 'projects', rows: 342, size: '8.1 MB', indexes: 3, queries: '890/s', growth: '+5%' },
  { name: 'skills', rows: 128, size: '1.2 MB', indexes: 2, queries: '2.1k/s', growth: '+2%' },
  { name: 'messages', rows: 8921, size: '15.7 MB', indexes: 3, queries: '340/s', growth: '+28%' },
  { name: 'sessions', rows: 45230, size: '112 MB', indexes: 5, queries: '4.5k/s', growth: '+18%' },
  { name: 'logs', rows: 234500, size: '456 MB', indexes: 2, queries: '8.9k/s', growth: '+45%' },
];
const slowQueries = [
  { query: 'SELECT * FROM users WHERE email = ?', time: '245ms', calls: '12.4k', table: 'users' },
  { query: 'SELECT p.*, u.name FROM projects p JOIN users u...', time: '189ms', calls: '3.2k', table: 'projects' },
  { query: 'INSERT INTO logs (level, message, timestamp)...', time: '156ms', calls: '8.9k', table: 'logs' },
  { query: 'SELECT COUNT(*) FROM messages WHERE read = false', time: '134ms', calls: '1.1k', table: 'messages' },
  { query: 'UPDATE users SET last_active = NOW() WHERE...', time: '98ms', calls: '4.5k', table: 'users' },
];
export default function Database() {
  const [query, setQuery] = useState('SELECT * FROM users ORDER BY created_at DESC LIMIT 10');
  return (
    <div>
      <div className="ops-metrics-row">
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Connections</span></div>
          <div className="ops-metric-value">42 / 100</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-green" style={{width:'42%'}} /></div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Queries/sec</span></div>
          <div className="ops-metric-value">8,920</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-blue" style={{width:'72%'}} /></div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Cache Hit Rate</span></div>
          <div className="ops-metric-value">94.2%</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-green" style={{width:'94.2%'}} /></div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Total Size</span></div>
          <div className="ops-metric-value">617 MB</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-amber" style={{width:'62%'}} /></div>
          <div className="ops-metric-detail">of 1 GB limit</div>
        </div>
      </div>
      <div className="ops-card" style={{marginBottom:24}}>
        <h3 className="ops-card-title">Tables</h3>
        <table className="ops-db-table">
          <thead>
            <tr><th>Table</th><th>Rows</th><th>Size</th><th>Indexes</th><th>Queries</th><th>Growth</th></tr>
          </thead>
          <tbody>
            {tables.map((t, i) => (
              <tr key={i}>
                <td><span className="ops-db-name">{t.name}</span></td>
                <td className="ops-db-rows">{t.rows.toLocaleString()}</td>
                <td className="ops-db-size">{t.size}</td>
                <td style={{color:'#94a3b8'}}>{t.indexes}</td>
                <td style={{color:'#06b6d4', fontFamily:'JetBrains Mono', fontSize:'0.82rem'}}>{t.queries}</td>
                <td><span className="ops-badge ops-badge-green">{t.growth}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ops-grid-equal">
        <div className="ops-card">
          <h3 className="ops-card-title">Query Console</h3>
          <div className="ops-query-bar">
            <input className="ops-query-input" value={query} onChange={e => setQuery(e.target.value)} />
            <button className="ops-query-btn">Run</button>
          </div>
          <div style={{background:'#0a0f1a',borderRadius:8,padding:16,fontFamily:'JetBrains Mono',fontSize:'0.82rem',color:'#10b981',maxHeight:200,overflow:'auto'}}>
            <div style={{color:'#64748b',marginBottom:8}}>-- Result (10 rows, 0.023s)</div>
            <div>| id | name | email | created_at |</div>
            <div>| 1 | Sarah Connor | sarah@skynet.com | 2026-01-15 |</div>
            <div>| 2 | Mike Chen | mike@example.com | 2026-02-20 |</div>
            <div>| 3 | Emma Wilson | emma@test.com | 2026-03-10 |</div>
            <div>| 4 | James Park | james@demo.io | 2026-04-05 |</div>
            <div>| 5 | Lisa Zhang | lisa@sample.com | 2026-05-12 |</div>
          </div>
        </div>
        <div className="ops-card">
          <h3 className="ops-card-title">Slow Queries</h3>
          {slowQueries.map((q, i) => (
            <div key={i} style={{padding:'10px 0', borderBottom: i < slowQueries.length - 1 ? '1px solid rgba(30,41,59,0.5)' : 'none'}}>
              <div style={{fontFamily:'JetBrains Mono', fontSize:'0.78rem', color:'#06b6d4', marginBottom:4}}>{q.query}</div>
              <div style={{display:'flex',gap:16,fontSize:'0.75rem'}}>
                <span style={{color:'#ef4444'}}>{q.time}</span>
                <span style={{color:'#64748b'}}>{q.calls} calls</span>
                <span className="ops-badge ops-badge-gray">{q.table}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
