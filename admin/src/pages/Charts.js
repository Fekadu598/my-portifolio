import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (<div className="adm-chart-tooltip"><p className="adm-tooltip-label">{label}</p>{payload.map((p, i) => (<p key={i} className="adm-tooltip-value" style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</p>))}</div>);
  }
  return null;
};
export default function Charts({ token }) {
  const [data, setData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/analytics`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch(`${API}/api/skills`).then(r => r.json()),
    ]).then(([analytics, skillList]) => {
      setData(analytics);
      setSkills(skillList);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);
  if (loading) return <div style={{ color: '#64748b', padding: 40, textAlign: 'center' }}>Loading analytics...</div>;
  if (!data) return <div style={{ color: '#ef4444', padding: 40, textAlign: 'center' }}>Failed to load analytics data</div>;
  const visitorData = data?.chartData?.visitors || [];
  const messageData = data?.chartData?.messages || [];
  const categoryData = [
    { category: 'Projects', count: data.projects || 0 },
    { category: 'Blog Posts', count: data.blogPosts || 0 },
    { category: 'Messages', count: data.messages || 0 },
    { category: 'Skills', count: skills.length },
  ];
  const skillData = skills.map(s => ({ name: s.name, value: 1 }));
  const COLORS = ['#06d6a0', '#8b5cf6', '#f59e0b', '#3b82f6', '#ef4444', '#06b6d4', '#f472b6', '#84cc16'];
  const totalVisitors = visitorData.reduce((sum, d) => sum + d.value, 0);
  const avgMessages = messageData.length ? Math.round(messageData.reduce((s, d) => s + d.value, 0) / messageData.length) : 0;
  return (
    <div className="adm-charts-page">
      <div className="adm-stats-row" style={{ marginBottom: 24 }}>
        <div className="adm-stat-card adm-stat-green">
          <div className="adm-stat-info"><span className="adm-stat-label">Total Visitors (7d)</span><span className="adm-stat-value">{totalVisitors.toLocaleString()}</span></div>
          <span style={{ fontSize: '1.5rem' }}>👁</span>
        </div>
        <div className="adm-stat-card adm-stat-purple">
          <div className="adm-stat-info"><span className="adm-stat-label">Avg Messages/Day</span><span className="adm-stat-value">{avgMessages}</span></div>
          <span style={{ fontSize: '1.5rem' }}>📊</span>
        </div>
        <div className="adm-stat-card adm-stat-amber">
          <div className="adm-stat-info"><span className="adm-stat-label">Skills</span><span className="adm-stat-value">{skills.length}</span></div>
          <span style={{ fontSize: '1.5rem' }}>🛠</span>
        </div>
        <div className="adm-stat-card adm-stat-blue">
          <div className="adm-stat-info"><span className="adm-stat-label">Blog Posts</span><span className="adm-stat-value">{data.blogPosts || 0}</span></div>
          <span style={{ fontSize: '1.5rem' }}>📝</span>
        </div>
      </div>
      <div className="adm-charts-grid-2">
        <div className="adm-card">
          <h3 className="adm-card-title">Visitor Trend (7 days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={visitorData}>
              <defs><linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#06d6a0" stopOpacity={0.3} /><stop offset="100%" stopColor="#06d6a0" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" name="Visitors" stroke="#06d6a0" strokeWidth={2.5} fill="url(#visitorGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="adm-card">
          <h3 className="adm-card-title">Messages (7 days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={messageData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }} />
              <Bar dataKey="value" name="Messages" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="adm-charts-grid-2">
        <div className="adm-card">
          <h3 className="adm-card-title">Content Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} barSize={48}>
              <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(6, 214, 160, 0.05)' }} />
              <Bar dataKey="count" name="Count" radius={[6, 6, 0, 0]}>{categoryData.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="adm-card">
          <h3 className="adm-card-title">Skills Breakdown</h3>
          <div className="adm-device-chart">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart><Pie data={skillData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">{skillData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="adm-device-legend">
              {skills.slice(0, 8).map((s, i) => (<div key={i} className="adm-legend-item"><span className="adm-legend-dot" style={{ background: COLORS[i % COLORS.length] }} /><span className="adm-legend-label">{s.name}</span></div>))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
