import React, { useState, useEffect } from 'react';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const tagColors = ['green', 'purple', 'amber', 'blue'];
export default function Projects({ token }) {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', tags: '', liveUrl: '#', sourceUrl: '#' });
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(`${API}/api/projects`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json()).then(setProjects).catch(console.error);
  }, [token]);

  const reset = () => { setForm({ title: '', description: '', tags: '', liveUrl: '#', sourceUrl: '#' }); setEditing(null); setShowForm(false); };

  const startEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description || '',
      tags: (project.tags || []).join(', '),
      liveUrl: project.liveUrl || '#',
      sourceUrl: project.sourceUrl || '#',
    });
    setEditing(project._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editing) {
        const res = await fetch(`${API}/api/projects/${editing}`, { method: 'PUT', headers, body: JSON.stringify(body) });
        const updated = await res.json();
        setProjects(prev => prev.map(p => p._id === editing ? updated : p));
      } else {
        const res = await fetch(`${API}/api/projects`, { method: 'POST', headers, body: JSON.stringify(body) });
        const created = await res.json();
        setProjects(prev => [...prev, created]);
      }
      reset();
    } catch (err) { console.error(err); }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await fetch(`${API}/api/projects/${id}`, { method: 'DELETE', headers });
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="adm-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 className="adm-card-title" style={{ marginBottom: 0 }}>Projects ({projects.length})</h3>
          <button className="adm-btn-icon" style={{ background: 'rgba(6,214,160,0.15)', color: '#06d6a0', width: 'auto', padding: '8px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600 }} onClick={() => { reset(); setShowForm(!showForm); }}>
            {showForm ? 'Cancel' : '+ New Project'}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} style={{ background: '#0f172a', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #334155' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Title</label>
                <input className="adm-input" placeholder="Project title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Tags (comma separated)</label>
                <input className="adm-input" placeholder="React, Node.js, MongoDB" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} style={{ width: '100%' }} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Description</label>
              <textarea className="adm-input" placeholder="Project description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ width: '100%', minHeight: 80, resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Live URL</label>
                <input className="adm-input" placeholder="https://..." value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Source URL</label>
                <input className="adm-input" placeholder="https://github.com/..." value={form.sourceUrl} onChange={e => setForm({ ...form, sourceUrl: e.target.value })} style={{ width: '100%' }} />
              </div>
            </div>
            <button type="submit" style={{ background: '#06d6a0', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{editing ? 'Update Project' : 'Save Project'}</button>
          </form>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {projects.map(p => (
            <div key={p._id} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <h4 style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>{p.title}</h4>
                  <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>{p.description}</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {(p.tags || []).map((tag, i) => (
                  <span key={i} className={`adm-plan-badge adm-plan-${tagColors[i % tagColors.length]}`}>{tag}</span>
                ))}
              </div>
              {(p.liveUrl && p.liveUrl !== '#') && (
                <div style={{ marginBottom: 12 }}>
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#06d6a0', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 500 }}>Live Demo →</a>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderTop: '1px solid #334155', paddingTop: 12, gap: 4 }}>
                <button className="adm-btn-icon" title="Edit" onClick={() => startEdit(p)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button className="adm-btn-icon adm-btn-icon-danger" title="Delete" onClick={() => deleteProject(p._id)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', padding: 20, gridColumn: '1/-1' }}>No projects yet. Create your first one!</p>}
        </div>
      </div>
    </div>
  );
}
