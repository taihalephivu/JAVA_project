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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: 32, minWidth: 340, maxWidth: 380 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#1976d2', letterSpacing: 1 }}>Đăng nhập</h2>
        <div style={{ marginBottom: 18 }}>
          <input name="username" placeholder="Tên đăng nhập" value={form.username} onChange={handleChange} required style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #bbb', fontSize: 16, marginBottom: 4 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <input name="password" type="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #bbb', fontSize: 16, marginBottom: 4 }} />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, borderRadius: 6, background: '#1976d2', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #1976d233', transition: 'background 0.2s' }}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        {error && <div style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</div>}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <span style={{ color: '#555' }}>Chưa có tài khoản?</span>
          <a href="/register" style={{ marginLeft: 8, color: '#1976d2', fontWeight: 600, fontSize: 15, textDecoration: 'underline' }}>Đăng ký</a>
        </div>
      </form>
    </div>
  );
};

export default Login; 