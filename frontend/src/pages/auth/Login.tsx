import React, { useState } from 'react';
import { login as loginApi } from '../../api';
import { User } from '../../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi(form);
      const { token, user } = res.data as { token: string; user: User };
      localStorage.setItem('token', token);
      onLogin(user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#fafbfc' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 6px 32px #0001', padding: 36, minWidth: 320, maxWidth: 380, width: '100%', margin: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
          <img src="/logo192.png" alt="Logo" style={{ width: 54, height: 54, marginBottom: 8, borderRadius: 12, boxShadow: '0 2px 8px #0002' }} />
          <h2 style={{ textAlign: 'center', margin: 0, marginBottom: 8, color: '#1565c0', fontWeight: 700, fontSize: 26, letterSpacing: 1 }}>Đăng nhập</h2>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} required style={{ width: '100%', padding: 13, borderRadius: 8, border: '1px solid #bbb', fontSize: 16, marginBottom: 0, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <input name="password" type="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required style={{ width: '100%', padding: 13, borderRadius: 8, border: '1px solid #bbb', fontSize: 16, marginBottom: 0, outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 13, borderRadius: 8, background: '#1976d2', color: '#fff', fontWeight: 700, fontSize: 17, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #1976d233', transition: 'background 0.2s', marginBottom: 6 }}
          onMouseOver={e => (e.currentTarget.style.background = '#1565c0')}
          onMouseOut={e => (e.currentTarget.style.background = '#1976d2')}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        {error && <div style={{ color: '#d32f2f', marginTop: 14, textAlign: 'center', fontWeight: 500, fontSize: 15 }}>{error}</div>}
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <span style={{ color: '#555' }}>Chưa có tài khoản?</span>
          <a href="/register" style={{ marginLeft: 8, color: '#1976d2', fontWeight: 600, fontSize: 15, textDecoration: 'underline' }}>Đăng ký</a>
        </div>
      </form>
    </div>
  );
};

export default Login; 