import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
const responseTimeData = [
  { t: '00:00', v: 120 }, { t: '02:00', v: 95 }, { t: '04:00', v: 88 }, { t: '06:00', v: 105 },
  { t: '08:00', v: 245 }, { t: '10:00', v: 310 }, { t: '12:00', v: 280 }, { t: '14:00', v: 195 },
  { t: '16:00', v: 165 }, { t: '18:00', v: 140 }, { t: '20:00', v: 110 }, { t: '22:00', v: 98 },
];
const statusCodes = [
  { code: '200 OK', count: 45230, pct: 87.2, cls: 'ops-status-2xx' },
  { code: '201 Created', count: 3420, pct: 6.6, cls: 'ops-status-2xx' },
  { code: '301 Redirect', count: 1240, pct: 2.4, cls: 'ops-status-3xx' },
  { code: '400 Bad Request', count: 890, pct: 1.7, cls: 'ops-status-4xx' },
  { code: '401 Unauthorized', count: 620, pct: 1.2, cls: 'ops-status-4xx' },
  { code: '404 Not Found', count: 340, pct: 0.7, cls: 'ops-status-4xx' },
  { code: '500 Server Error', count: 180, pct: 0.3, cls: 'ops-status-5xx' },
  { code: '503 Unavailable', count: 42, pct: 0.08, cls: 'ops-status-5xx' },
];
const endpoints = [
  { method: 'GET', path: '/api/users', avg: '45ms', p95: '120ms', p99: '340ms', reqs: '12.4k/min' },
  { method: 'POST', path: '/api/auth/login', avg: '180ms', p95: '450ms', p99: '890ms', reqs: '3.2k/min' },
  { method: 'GET', path: '/api/projects', avg: '32ms', p95: '85ms', p99: '210ms', reqs: '8.7k/min' },
  { method: 'POST', path: '/api/contact', avg: '95ms', p95: '220ms', p99: '540ms', reqs: '1.1k/min' },
  { method: 'PUT', path: '/api/users/:id', avg: '110ms', p95: '280ms', p99: '620ms', reqs: '2.8k/min' },
  { method: 'DELETE', path: '/api/projects/:id', avg: '65ms', p95: '150ms', p99: '380ms', reqs: '0.4k/min' },
  { method: 'GET', path: '/api/skills', avg: '28ms', p95: '70ms', p99: '160ms', reqs: '6.3k/min' },
];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (<div className="ops-chart-tooltip"><p className="ops-tooltip-label">{label}</p><p className="ops-tooltip-value">{payload[0].value}ms</p></div>);
  }
  return null;
};
const methodCls = { GET: 'ops-method-get', POST: 'ops-method-post', PUT: 'ops-method-put', DELETE: 'ops-method-delete' };
export default function ApiMonitor() {
  return (
    <div>
      <div className="ops-metrics-row">
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Avg Response</span></div>
          <div className="ops-metric-value">142ms</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-green" style={{width:'28%'}} /></div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Requests/min</span></div>
          <div className="ops-metric-value">5,240</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-blue" style={{width:'65%'}} /></div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Error Rate</span></div>
          <div className="ops-metric-value">0.38%</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-amber" style={{width:'4%'}} /></div>
        </div>
        <div className="ops-metric-card">
          <div className="ops-metric-header"><span className="ops-metric-label">Uptime</span></div>
          <div className="ops-metric-value">99.97%</div>
          <div className="ops-metric-bar"><div className="ops-metric-bar-fill ops-bar-green" style={{width:'99.97%'}} /></div>
        </div>
      </div>
      <div className="ops-grid-2">
        <div className="ops-card">
          <h3 className="ops-card-title">Response Time (24h)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="ops-card">
          <h3 className="ops-card-title">HTTP Status Codes</h3>
          <div className="ops-table" style={{gridTemplateColumns:'2fr 1fr 1fr'}}>
            <div className="ops-table-header"><span>Code</span><span>Count</span><span>%</span></div>
            {statusCodes.map((s, i) => (
              <div key={i} className="ops-table-row" style={{gridTemplateColumns:'2fr 1fr 1fr'}}>
                <span><span className={`ops-status-badge ${s.cls}`}>{s.code}</span></span>
                <span style={{color:'#94a3b8', fontFamily:'JetBrains Mono', fontSize:'0.82rem'}}>{s.count.toLocaleString()}</span>
                <span style={{color:'#94a3b8'}}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ops-card" style={{marginBottom:24}}>
        <h3 className="ops-card-title">Endpoint Performance</h3>
        <div className="ops-table" style={{gridTemplateColumns:'1fr 2fr 1fr 1fr 1fr 1fr'}}>
          <div className="ops-table-header"><span>Method</span><span>Endpoint</span><span>Avg</span><span>P95</span><span>P99</span><span>Reqs</span></div>
          {endpoints.map((ep, i) => (
            <div key={i} className="ops-table-row" style={{gridTemplateColumns:'1fr 2fr 1fr 1fr 1fr 1fr'}}>
              <span><span className={`ops-method ${methodCls[ep.method]}`}>{ep.method}</span></span>
              <span className="ops-endpoint">{ep.path}</span>
              <span style={{color:'#10b981', fontFamily:'JetBrains Mono', fontSize:'0.82rem'}}>{ep.avg}</span>
              <span style={{color:'#f59e0b', fontFamily:'JetBrains Mono', fontSize:'0.82rem'}}>{ep.p95}</span>
              <span style={{color:'#ef4444', fontFamily:'JetBrains Mono', fontSize:'0.82rem'}}>{ep.p99}</span>
              <span style={{color:'#94a3b8'}}>{ep.reqs}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
