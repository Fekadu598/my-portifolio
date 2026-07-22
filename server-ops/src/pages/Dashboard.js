import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
const cpuData = [
  { t: '00:00', v: 34 }, { t: '04:00', v: 28 }, { t: '08:00', v: 67 }, { t: '12:00', v: 82 },
  { t: '16:00', v: 74 }, { t: '20:00', v: 45 }, { t: '23:59', v: 38 },
];
const memData = [
  { t: '00:00', v: 52 }, { t: '04:00', v: 50 }, { t: '08:00', v: 68 }, { t: '12:00', v: 78 },
  { t: '16:00', v: 72 }, { t: '20:00', v: 61 }, { t: '23:59', v: 55 },
];
const netData = [
  { t: '00:00', in: 120, out: 80 }, { t: '04:00', in: 90, out: 60 }, { t: '08:00', in: 340, out: 210 },
  { t: '12:00', in: 520, out: 380 }, { t: '16:00', in: 480, out: 320 }, { t: '20:00', in: 290, out: 180 },
  { t: '23:59', in: 150, out: 100 },
];
const services = [
  { name: 'nginx', status: 'running', uptime: '99.99%', cpu: 2.1 },
  { name: 'node-api', status: 'running', uptime: '99.95%', cpu: 14.3 },
  { name: 'mongodb', status: 'running', uptime: '99.98%', cpu: 8.7 },
  { name: 'redis', status: 'running', uptime: '100%', cpu: 1.2 },
  { name: 'celery-worker', status: 'warning', uptime: '98.2%', cpu: 45.6 },
];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (<div className="ops-chart-tooltip"><p className="ops-tooltip-label">{label}</p>{payload.map((p, i) => <p key={i} className="ops-tooltip-value" style={{ color: p.color }}>{p.name}: {p.value}{typeof p.value === 'number' && p.value > 100 ? ' MB/s' : '%'}</p>)}</div>);
  }
  return null;
};
export default function Dashboard() {
  return (
    <div>
      <div className="ops-metrics-row">
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">CPU Usage</span><div className="ops-metric-icon ops-metric-icon-green"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/></svg></div></div>
          <div className="ops-metric-value">67%</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-green" style={{width:'67%'}} /></div>
          <div className="ops-metric-detail">8 cores / 3.4 GHz</div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Memory</span><div className="ops-metric-icon ops-metric-icon-blue"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 6V4M10 6V4M14 6V4M18 6V4M6 18v2M10 18v2M14 18v2M18 18v2"/></svg></div></div>
          <div className="ops-metric-value">72%</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-blue" style={{width:'72%'}} /></div>
          <div className="ops-metric-detail">11.5 / 16 GB</div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Disk</span><div className="ops-metric-icon ops-metric-icon-amber"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div></div>
          <div className="ops-metric-value">48%</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-amber" style={{width:'48%'}} /></div>
          <div className="ops-metric-detail">240 / 500 GB SSD</div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Network</span><div className="ops-metric-icon ops-metric-icon-red"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg></div></div>
          <div className="ops-metric-value">520 MB/s</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-red" style={{width:'65%'}} /></div>
          <div className="ops-metric-detail">In: 340 / Out: 180 MB/s</div>
        </div>
      </div>
      <div className="ops-grid-2">
        <div className="ops-card">
          <h3 className="ops-card-title">CPU Usage (24h)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={cpuData}>
              <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="v" name="CPU" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="ops-card">
          <h3 className="ops-card-title">Services</h3>
          <div className="ops-table" style={{gridTemplateColumns:'2fr 1fr 1fr'}}>
            <div className="ops-table-header"><span>Service</span><span>Status</span><span>CPU</span></div>
            {services.map((s, i) => (
              <div key={i} className="ops-table-row" style={{gridTemplateColumns:'2fr 1fr 1fr'}}>
                <span style={{fontFamily:'JetBrains Mono', fontSize:'0.85rem', color:'#06b6d4'}}>{s.name}</span>
                <span className={`ops-badge ${s.status === 'running' ? 'ops-badge-green' : 'ops-badge-amber'}`}>{s.status}</span>
                <span style={{color:'#94a3b8'}}>{s.cpu}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ops-grid-equal">
        <div className="ops-card">
          <h3 className="ops-card-title">Memory Usage (24h)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={memData}>
              <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="v" name="Memory" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 3, fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="ops-card">
          <h3 className="ops-card-title">Network I/O (24h)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={netData} barGap={2}>
              <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="in" name="Inbound" fill="#10b981" radius={[4, 4, 0, 0]} barSize={14} />
              <Bar dataKey="out" name="Outbound" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
          <div className="ops-legend">
            <div className="ops-legend-item"><span className="ops-legend-dot" style={{background:'#10b981'}} /><span className="ops-legend-label">Inbound</span></div>
            <div className="ops-legend-item"><span className="ops-legend-dot" style={{background:'#06b6d4'}} /><span className="ops-legend-label">Outbound</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
