import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateProfile, deleteUser } from '../../api';
import { User } from '../../types';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ fullName: '', email: '', phoneNumber: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getUser(id!);
        setUser(res.data);
        setForm({
          fullName: res.data.fullName || '',
          email: res.data.email || '',
          phoneNumber: res.data.phoneNumber || '',
          role: res.data.role || ''
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateProfile(id!, form);
      setSuccess('Cập nhật thông tin thành công!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Cập nhật thông tin thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteUser(id!);
      navigate('/users');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xóa người dùng thất bại');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết người dùng</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
      ) : user ? (
        <form onSubmit={handleSubmit} style={{ fontSize: 16, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><b>ID:</b> {user.id}</div>
          <div><b>Tên đăng nhập:</b> {user.username}</div>
          <input name="fullName" placeholder="Họ tên" value={form.fullName} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
          <input name="phoneNumber" placeholder="Số điện thoại" value={form.phoneNumber} onChange={handleChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
          <select name="role" value={form.role} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }}>
            <option value="ROLE_ADMIN">Quản trị viên</option>
            <option value="ROLE_CUSTOMER">Khách hàng</option>
            <option value="ROLE_STAFF">Nhân viên</option>
            <option value="ROLE_MANAGER">Quản lý</option>
          </select>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" disabled={saving} style={{ background: '#1976d2', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
            <button type="button" onClick={handleDelete} disabled={deleting} style={{ background: '#d32f2f', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{deleting ? 'Đang xóa...' : 'Xóa người dùng'}</button>
          </div>
          {success && <div style={{ color: 'green', textAlign: 'center' }}>{success}</div>}
          {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        </form>
      ) : (
        <div>Không tìm thấy người dùng.</div>
      )}
      <a href="/users" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
    </div>
  );
};

export default UserDetail; 