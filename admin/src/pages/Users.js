import React, { useState, useEffect } from 'react';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default function Users({ token }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(`${API}/api/auth/users`, { headers })
      .then(res => res.json())
      .then(data => { setUsers(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await fetch(`${API}/api/auth/users/${id}`, { method: 'DELETE', headers });
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) { console.error(err); }
  };

  if (loading) return <div style={{ color: '#64748b', padding: 40, textAlign: 'center' }}>Loading users...</div>;

  return (
    <div className="adm-users-page">
      <div className="adm-card">
        <div className="adm-users-header">
          <div className="adm-users-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="adm-users-actions">
            <span className="adm-users-count">{filtered.length} users</span>
          </div>
        </div>
        <div className="adm-users-table">
          <div className="adm-table-header" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
            <span className="adm-col-user">User</span>
            <span className="adm-col-role">Role</span>
            <span className="adm-col-status">Joined</span>
            <span className="adm-col-actions">Actions</span>
          </div>
          {filtered.map((user) => (
            <div key={user._id} className="adm-table-row" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
              <span className="adm-col-user">
                <span className="adm-user-avatar">{user.email.charAt(0).toUpperCase()}</span>
                <div>
                  <div className="adm-user-email">{user.email}</div>
                </div>
              </span>
              <span className="adm-col-role" style={{ color: '#06d6a0', fontWeight: 600 }}>Admin</span>
              <span className="adm-col-status" style={{ color: '#64748b', fontSize: '0.82rem' }}>
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
              <span className="adm-col-actions">
                <button className="adm-btn-icon adm-btn-icon-danger" title="Delete" onClick={() => deleteUser(user._id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </span>
            </div>
          ))}
          {filtered.length === 0 && <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', padding: 20 }}>No users found.</p>}
        </div>
      </div>
    </div>
  );
}
