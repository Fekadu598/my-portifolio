import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (<div className="adm-chart-tooltip"><p className="adm-tooltip-label">{label}</p><p className="adm-tooltip-value">{payload[0].value}</p></div>);
  }
  return null;
};
export default function Overview({ token, setActive }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API}/api/analytics`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, [token]);

  if (loading) return <div style={{ color: '#64748b', padding: 40, textAlign: 'center' }}>Loading analytics...</div>;

  const stats = data ? [
    { label: 'Projects', value: data.projects, color: 'green', icon: '📁' },
    { label: 'Messages', value: data.messages, color: 'purple', icon: '💬' },
    { label: 'Unread', value: data.unreadMessages, color: 'amber', icon: '📬' },
    { label: 'Blog Posts', value: data.blogPosts, color: 'blue', icon: '📝' },
  ] : [];

  return (
    <div>
      <div className="adm-stats-row">
        {stats.map((s, i) => (
          <div key={i} className={`adm-stat-card adm-stat-${s.color}`}>
            <div className="adm-stat-info">
              <span className="adm-stat-label">{s.label}</span>
              <span className="adm-stat-value">{s.value ?? 0}</span>
            </div>
            <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div className="adm-card">
          <h3 className="adm-card-title">Visitor Trend (7 days)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data?.chartData?.visitors || []} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(6,214,160,0.05)' }} />
              <Bar dataKey="value" fill="#06d6a0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="adm-card">
          <h3 className="adm-card-title">Messages (7 days)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data?.chartData?.messages || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4, fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="adm-card" style={{ marginBottom: 24 }}>
        <h3 className="adm-card-title">Quick Actions</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => setActive('projects')} style={{ padding: '10px 20px', borderRadius: 8, background: 'rgba(6,214,160,0.15)', color: '#06d6a0', border: 'none', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit' }}>Add Project</button>
          <button onClick={() => setActive('messages')} style={{ padding: '10px 20px', borderRadius: 8, background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', border: 'none', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit' }}>Check Messages</button>
          <button onClick={() => setActive('blog')} style={{ padding: '10px 20px', borderRadius: 8, background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: 'none', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit' }}>Write Post</button>
          <button onClick={() => setActive('settings')} style={{ padding: '10px 20px', borderRadius: 8, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: 'none', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'inherit' }}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
