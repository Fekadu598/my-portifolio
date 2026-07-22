import React, { useState } from 'react';
const allLogs = [
  { time: '2026-07-21 18:32:14', level: 'info', msg: 'Server started on port 5000' },
  { time: '2026-07-21 18:32:15', level: 'info', msg: 'MongoDB connected successfully' },
  { time: '2026-07-21 18:33:01', level: 'info', msg: 'GET /api/projects 200 — 23ms' },
  { time: '2026-07-21 18:33:02', level: 'info', msg: 'GET /api/skills 200 — 12ms' },
  { time: '2026-07-21 18:33:15', level: 'warn', msg: 'Rate limit approaching for IP 192.168.1.45 (87/100 requests)' },
  { time: '2026-07-21 18:33:22', level: 'info', msg: 'POST /api/contact 201 — 45ms' },
  { time: '2026-07-21 18:34:01', level: 'error', msg: 'Failed to send email notification: SMTP connection timeout' },
  { time: '2026-07-21 18:34:05', level: 'info', msg: 'GET /api/users 200 — 34ms' },
  { time: '2026-07-21 18:34:12', level: 'warn', msg: 'Slow query detected: SELECT * FROM users (245ms)' },
  { time: '2026-07-21 18:34:30', level: 'info', msg: 'PUT /api/users/12 200 — 67ms' },
  { time: '2026-07-21 18:35:01', level: 'error', msg: 'Unhandled promise rejection in notification worker' },
  { time: '2026-07-21 18:35:08', level: 'info', msg: 'GET /api/projects 200 — 19ms' },
  { time: '2026-07-21 18:35:15', level: 'info', msg: 'DELETE /api/projects/5 204 — 31ms' },
  { time: '2026-07-21 18:35:22', level: 'warn', msg: 'Memory usage at 78% — consider scaling' },
  { time: '2026-07-21 18:35:30', level: 'info', msg: 'POST /api/auth/login 200 — 189ms' },
  { time: '2026-07-21 18:36:01', level: 'info', msg: 'GET /api/skills 200 — 8ms' },
  { time: '2026-07-21 18:36:14', level: 'error', msg: 'Connection pool exhausted — waiting for available slot' },
  { time: '2026-07-21 18:36:20', level: 'info', msg: 'Connection pool recovered — 42 active connections' },
  { time: '2026-07-21 18:36:35', level: 'warn', msg: 'SSL certificate expires in 14 days' },
  { time: '2026-07-21 18:37:01', level: 'info', msg: 'Health check passed — all services operational' },
];
const filters = ['all', 'info', 'warn', 'error'];
export default function Logs() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? allLogs : allLogs.filter(l => l.level === filter);
  const counts = { info: allLogs.filter(l => l.level === 'info').length, warn: allLogs.filter(l => l.level === 'warn').length, error: allLogs.filter(l => l.level === 'error').length };
  return (
    <div>
      <div className="ops-metrics-row">
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Total Logs</span></div>
          <div className="ops-metric-value">{allLogs.length}</div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Info</span></div>
          <div className="ops-metric-value" style={{color:'#06b6d4'}}>{counts.info}</div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Warnings</span></div>
          <div className="ops-metric-value" style={{color:'#f59e0b'}}>{counts.warn}</div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Errors</span></div>
          <div className="ops-metric-value" style={{color:'#ef4444'}}>{counts.error}</div>
        </div>
      </div>
      <div className="ops-card">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <h3 className="ops-card-title" style={{marginBottom:0}}>System Logs</h3>
          <div className="ops-log-filters">
            {filters.map(f => (
              <button key={f} className={`ops-log-filter ${filter === f ? 'ops-log-filter-active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)} {f !== 'all' && `(${counts[f]})`}
              </button>
            ))}
          </div>
        </div>
        <div style={{maxHeight:500,overflow:'auto'}}>
          {filtered.map((log, i) => (
            <div key={i} className="ops-log-entry">
              <span className="ops-log-time">{log.time}</span>
              <span className={`ops-log-level ops-log-level-${log.level}`}>{log.level.toUpperCase()}</span>
              <span className="ops-log-msg">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
