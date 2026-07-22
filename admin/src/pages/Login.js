import React, { useState } from 'react';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      if (remember) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const s = {
    wrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' },
    box: { background: '#111', border: '1px solid #222', borderRadius: 16, padding: 36, width: 400, maxWidth: '90%' },
    logo: { fontSize: '1.2rem', fontWeight: 700, color: '#f5f5f5', marginBottom: 4 },
    sub: { color: '#666', fontSize: '0.85rem', marginBottom: 28 },
    label: { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#999', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' },
    inputWrap: { position: 'relative', marginBottom: 16 },
    input: { width: '100%', padding: '12px 14px', paddingRight: 44, borderRadius: 8, border: '1px solid #222', background: '#0a0a0a', color: '#f5f5f5', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', transition: '0.2s ease' },
    eyeBtn: { position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4 },
    row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
    remember: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.82rem', color: '#999' },
    checkbox: { width: 16, height: 16, accentColor: '#3b82f6', cursor: 'pointer' },
    forgot: { fontSize: '0.82rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 500 },
    btn: { width: '100%', padding: 12, borderRadius: 8, border: 'none', background: loading ? '#2563eb' : '#3b82f6', color: '#fff', fontWeight: 600, fontSize: '0.9rem', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.8 : 1, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: '0.2s ease' },
    spinner: { width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' },
  };

  return (
    <div style={s.wrap}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ textAlign: 'center', width: 400, maxWidth: '90%' }}>
        <div style={s.box}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f5f5f5', marginBottom: 4 }}>alex.dev</div>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>Sign in to manage your portfolio</p>
          </div>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                <span style={{ color: '#fca5a5', fontSize: '0.85rem' }}>{error}</span>
              </div>
            )}
            <div style={s.inputWrap}>
              <label style={s.label}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={s.input} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#222'} />
            </div>
            <div style={s.inputWrap}>
              <label style={s.label}>Password</label>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter password" style={s.input} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = '#222'} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={s.eyeBtn}>
                {showPass
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
            <div style={s.row}>
              <label style={s.remember}>
                <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} style={s.checkbox} />
                Remember me
              </label>
              <a href="#forgot" style={s.forgot}>Forgot?</a>
            </div>
            <button type="submit" disabled={loading} style={s.btn}>
              {loading && <div style={s.spinner} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.75rem', color: '#444' }}>Admin Dashboard</p>
      </div>
    </div>
  );
}
