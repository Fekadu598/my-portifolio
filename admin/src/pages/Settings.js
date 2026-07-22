import React, { useState, useEffect, useRef } from 'react';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default function Settings({ token }) {
  const [profile, setProfile] = useState({ name: '', title: '', bio: '', email: '', photo: '', socialLinks: { github: '', linkedin: '', twitter: '' }, stats: { yearsExperience: 0, projectsCompleted: 0, happyClients: 0 } });
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch(`${API}/api/profile`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()).then(setProfile).catch(console.error);
  }, []);

  const update = (field, value) => setProfile(prev => ({ ...prev, [field]: value }));
  const updateSocial = (field, value) => setProfile(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [field]: value } }));
  const updateStats = (field, value) => setProfile(prev => ({ ...prev, stats: { ...prev.stats, [field]: Number(value) } }));

  const save = async () => {
    try {
      const res = await fetch(`${API}/api/profile`, { method: 'PUT', headers, body: JSON.stringify(profile) });
      const data = await res.json();
      setProfile(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { console.error(err); }
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);
      const res = await fetch(`${API}/api/profile/photo`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.photo) {
        setProfile(prev => ({ ...prev, photo: data.photo }));
      }
    } catch (err) { console.error(err); }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const photoUrl = profile.photo ? `${API}${profile.photo}` : '';

  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#f8fafc', fontFamily: 'inherit', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 };

  return (
    <div>
      <div className="adm-card" style={{ marginBottom: 20 }}>
        <h3 className="adm-card-title">Profile Photo</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#1e293b', border: '3px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            {photoUrl ? (
              <img src={photoUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4a4568" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            )}
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" onChange={uploadPhoto} style={{ display: 'none' }} />
            <button onClick={() => fileRef.current.click()} disabled={uploading} style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#f8fafc', fontWeight: 600, fontSize: '0.88rem', cursor: uploading ? 'wait' : 'pointer', fontFamily: 'inherit', marginBottom: 8 }}>
              {uploading ? 'Uploading...' : photoUrl ? 'Change Photo' : 'Upload Photo'}
            </button>
            <p style={{ fontSize: '0.75rem', color: '#4a4568', marginTop: 4 }}>JPG, PNG, GIF or WebP. Max 5MB.</p>
          </div>
        </div>
      </div>

      <div className="adm-card" style={{ marginBottom: 20 }}>
        <h3 className="adm-card-title">Profile</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={labelStyle}>Name</label><input style={inputStyle} value={profile.name} onChange={e => update('name', e.target.value)} /></div>
          <div><label style={labelStyle}>Title</label><input style={inputStyle} value={profile.title} onChange={e => update('title', e.target.value)} /></div>
        </div>
        <div style={{ marginTop: 16 }}><label style={labelStyle}>Bio</label><textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={profile.bio} onChange={e => update('bio', e.target.value)} /></div>
        <div style={{ marginTop: 16 }}><label style={labelStyle}>Email</label><input style={inputStyle} value={profile.email} onChange={e => update('email', e.target.value)} /></div>
      </div>

      <div className="adm-card" style={{ marginBottom: 20 }}>
        <h3 className="adm-card-title">Social Links</h3>
        <div style={{ display: 'grid', gap: 16 }}>
          <div><label style={labelStyle}>GitHub</label><input style={inputStyle} value={profile.socialLinks?.github || ''} onChange={e => updateSocial('github', e.target.value)} placeholder="https://github.com/..." /></div>
          <div><label style={labelStyle}>LinkedIn</label><input style={inputStyle} value={profile.socialLinks?.linkedin || ''} onChange={e => updateSocial('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." /></div>
          <div><label style={labelStyle}>Twitter</label><input style={inputStyle} value={profile.socialLinks?.twitter || ''} onChange={e => updateSocial('twitter', e.target.value)} placeholder="https://twitter.com/..." /></div>
        </div>
      </div>

      <div className="adm-card" style={{ marginBottom: 20 }}>
        <h3 className="adm-card-title">Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div><label style={labelStyle}>Years Experience</label><input type="number" style={inputStyle} value={profile.stats?.yearsExperience || 0} onChange={e => updateStats('yearsExperience', e.target.value)} /></div>
          <div><label style={labelStyle}>Projects Completed</label><input type="number" style={inputStyle} value={profile.stats?.projectsCompleted || 0} onChange={e => updateStats('projectsCompleted', e.target.value)} /></div>
          <div><label style={labelStyle}>Happy Clients</label><input type="number" style={inputStyle} value={profile.stats?.happyClients || 0} onChange={e => updateStats('happyClients', e.target.value)} /></div>
        </div>
      </div>

      <button onClick={save} style={{ padding: '12px 32px', borderRadius: 8, border: 'none', background: saved ? '#059669' : '#06d6a0', color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit', transition: '0.2s' }}>
        {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}
