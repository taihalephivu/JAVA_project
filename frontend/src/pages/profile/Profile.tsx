import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [form, setForm] = useState({ fullName: 'Nguyễn Văn A', email: 'user@email.com', phoneNumber: '0123456789' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gọi API cập nhật thông tin cá nhân
    alert('Cập nhật thông tin thành công!');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input name="fullName" placeholder="Họ và tên" value={form.fullName} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <input name="phoneNumber" placeholder="Số điện thoại" value={form.phoneNumber} onChange={handleChange} style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '12px 0', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>Lưu thay đổi</button>
      </form>
    </div>
  );
};

export default Profile; 