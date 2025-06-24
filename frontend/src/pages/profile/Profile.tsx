import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../api';
import { User } from '../../types';

const Profile: React.FC = () => {
  const [form, setForm] = useState({ fullName: '', email: '', phoneNumber: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getProfile();
        const userData = res.data as User;
        setUser(userData);
        setForm({
          fullName: userData.fullName || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || ''
        });
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Không thể tải thông tin cá nhân');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateProfile(form);
      setSuccess('Cập nhật thông tin thành công!');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Cập nhật thông tin thất bại');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Thông tin cá nhân</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input name="fullName" placeholder="Họ và tên" value={form.fullName} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
          <input name="phoneNumber" placeholder="Số điện thoại" value={form.phoneNumber} onChange={handleChange} style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
          <button type="submit" disabled={saving} style={{ background: '#1976d2', color: '#fff', padding: '12px 0', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
          {success && <div style={{ color: 'green', textAlign: 'center' }}>{success}</div>}
          {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        </form>
      )}
    </div>
  );
};

export default Profile; 