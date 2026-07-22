import React, { useState, useEffect } from 'react';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const tagColors = ['green', 'purple', 'amber', 'blue', 'gray'];
export default function Blog({ token }) {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', tags: '', published: false });
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(`${API}/api/blog`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()).then(setPosts).catch(console.error);
  }, []);

  const reset = () => { setForm({ title: '', excerpt: '', content: '', tags: '', published: false }); setEditing(null); setShowForm(false); };

  const startEdit = (post) => {
    setForm({ title: post.title, excerpt: post.excerpt, content: post.content, tags: (post.tags || []).join(', '), published: post.published });
    setEditing(post._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editing) {
        const res = await fetch(`${API}/api/blog/${editing}`, { method: 'PUT', headers, body: JSON.stringify(body) });
        const updated = await res.json();
        setPosts(prev => prev.map(p => p._id === editing ? updated : p));
      } else {
        const res = await fetch(`${API}/api/blog`, { method: 'POST', headers, body: JSON.stringify(body) });
        const created = await res.json();
        setPosts(prev => [created, ...prev]);
      }
      reset();
    } catch (err) { console.error(err); }
  };

  const togglePublish = async (id, current) => {
    try {
      const res = await fetch(`${API}/api/blog/${id}`, { method: 'PUT', headers, body: JSON.stringify({ published: !current }) });
      const updated = await res.json();
      setPosts(prev => prev.map(p => p._id === id ? updated : p));
    } catch (err) { console.error(err); }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`${API}/api/blog/${id}`, { method: 'DELETE', headers });
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  };

  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#f8fafc', fontFamily: 'inherit', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 };

  return (
    <div>
      <div className="adm-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 className="adm-card-title" style={{ marginBottom: 0 }}>Blog Posts</h3>
          <button className="adm-btn-icon" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', width: 'auto', padding: '8px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600 }} onClick={() => { reset(); setShowForm(!showForm); }}>
            {showForm ? 'Cancel' : editing ? 'Cancel Edit' : '+ New Post'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ background: '#0f172a', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #334155' }}>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Title</label>
              <input style={inputStyle} placeholder="Post title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Excerpt</label>
              <input style={inputStyle} placeholder="Short summary" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} required />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Content</label>
              <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} placeholder="Write your post content..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Tags (comma separated)</label>
                <input style={inputStyle} placeholder="React, Node.js, Tutorial" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, paddingBottom: 2 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem', color: '#94a3b8' }}>
                  <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} style={{ width: 16, height: 16, accentColor: '#06d6a0' }} />
                  Publish
                </label>
                <button type="submit" style={{ background: '#06d6a0', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {editing ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.length === 0 && <p style={{ color: '#64748b', fontSize: '0.88rem', textAlign: 'center', padding: 20 }}>No posts yet. Create your first one!</p>}
          {posts.map(post => (
            <div key={post._id} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h4 style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 600 }}>{post.title}</h4>
                    <span className={`adm-status-badge ${post.published ? 'adm-status-success' : 'adm-status-warning'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: 8 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(post.tags || []).map((tag, i) => (
                      <span key={i} className={`adm-plan-badge adm-plan-${tagColors[i % tagColors.length]}`}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
                  <button className="adm-btn-icon" title="Edit" onClick={() => startEdit(post)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="adm-btn-icon" title="Toggle publish" onClick={() => togglePublish(post._id, post.published)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
                  </button>
                  <button className="adm-btn-icon adm-btn-icon-danger" title="Delete" onClick={() => deletePost(post._id)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#4a4568', marginTop: 8 }}>
                Created {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
