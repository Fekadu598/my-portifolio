import React, { useState, useEffect } from 'react';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default function Messages({ token }) {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(`${API}/api/contact`, { headers }).then(res => res.json()).then(setMessages).catch(console.error);
  }, []);

  const markRead = async (id) => {
    try {
      await fetch(`${API}/api/contact/${id}/read`, { method: 'PUT', headers });
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
    } catch (err) { console.error(err); }
  };

  const deleteMessage = async (id) => {
    try {
      await fetch(`${API}/api/contact/${id}`, { method: 'DELETE', headers });
      setMessages(prev => prev.filter(m => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (err) { console.error(err); }
  };

  const unread = messages.filter(m => !m.read).length;

  const formatTime = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div>
      <div className="adm-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 className="adm-card-title" style={{ marginBottom: 0 }}>Messages</h3>
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{unread} unread</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 20, minHeight: 400 }}>
          <div style={{ borderRight: '1px solid #334155', paddingRight: 20, overflowY: 'auto' }}>
            {messages.length === 0 && <p style={{ color: '#64748b', fontSize: '0.85rem' }}>No messages yet.</p>}
            {messages.map(m => (
              <div key={m._id} onClick={() => { setSelected(m); markRead(m._id); }} style={{ padding: '14px 16px', borderRadius: 8, cursor: 'pointer', marginBottom: 4, background: selected?._id === m._id ? 'rgba(6,214,160,0.08)' : m.read ? 'transparent' : 'rgba(6,214,160,0.03)', borderLeft: m.read ? '3px solid transparent' : '3px solid #06d6a0', transition: '0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: m.read ? 500 : 700, color: '#f8fafc', fontSize: '0.88rem' }}>{m.name}</span>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{formatTime(m.createdAt)}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.message}</p>
              </div>
            ))}
          </div>
          <div style={{ paddingLeft: 8 }}>
            {selected ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <h4 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 700 }}>{selected.name}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.82rem' }}>{selected.email}</p>
                  </div>
                  <button className="adm-btn-icon adm-btn-icon-danger" title="Delete" onClick={() => deleteMessage(selected._id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: 8 }}>Sent {formatTime(selected.createdAt)}</div>
                <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 10, padding: 20, color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.7 }}>{selected.message}</div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b', fontSize: '0.9rem' }}>Select a message to read</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
