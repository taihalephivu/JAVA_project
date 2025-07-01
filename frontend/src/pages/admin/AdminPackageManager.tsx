import React, { useState, useEffect } from 'react';
import { getPackages, createPackage, updatePackage, deletePackage } from '../../api';
import { TestPackage } from '../../types';

const AdminPackageManager: React.FC = () => {
  const [packages, setPackages] = useState<TestPackage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', features: '', icon: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPackages();
      setPackages(data as TestPackage[]);
    } catch (e) {
      setError('Không thể tải danh sách gói xét nghiệm.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const pkg: TestPackage = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      features: form.features ? form.features.split(',').map(f => f.trim()) : [],
      icon: form.icon || undefined,
    };
    try {
    if (editingId) {
        await updatePackage(editingId, pkg);
    } else {
        await createPackage(pkg);
    }
      fetchPackages();
    setShowForm(false);
      setForm({ name: '', description: '', price: '', features: '', icon: '' });
    setEditingId(null);
    } catch (e) {
      setError('Lưu gói xét nghiệm thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg: TestPackage) => {
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      features: pkg.features ? pkg.features.join(', ') : '',
      icon: pkg.icon || '',
    });
    setEditingId(pkg.id!);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Xóa gói này?')) return;
    setLoading(true);
    setError(null);
    try {
      await deletePackage(id);
      fetchPackages();
    } catch (e) {
      setError('Xóa gói thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 0 }}>
      <div style={{ background: '#e3f0fd', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: '24px 32px 12px 32px', borderLeft: '6px solid #1976d2', boxShadow: '0 2px 12px #1976d211' }}>
        <h2 style={{ color: '#1976d2', marginBottom: 0, fontSize: 26, fontWeight: 700 }}>Quản lý gói xét nghiệm</h2>
      </div>
      <div style={{ padding: 32 }}>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: '', description: '', price: '', features: '', icon: '' }); }} style={{ background: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: 6, fontWeight: 600, marginBottom: 18 }}>Tạo gói mới</button>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: 24, background: '#f9f9f9', padding: 18, borderRadius: 8 }}>
            <input name="name" placeholder="Tên gói" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', marginBottom: 10 }} />
            <textarea name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', minHeight: 60, marginBottom: 10 }} />
            <input name="price" type="number" placeholder="Giá tiền" value={form.price} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', marginBottom: 10 }} />
            <input name="features" placeholder="Tính năng (cách nhau bởi dấu phẩy)" value={form.features} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', marginBottom: 10 }} />
            <input name="icon" placeholder="Biểu tượng (emoji hoặc url)" value={form.icon} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', marginBottom: 10 }} />
            <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '8px 18px', borderRadius: 6, fontWeight: 600 }}>{editingId ? 'Cập nhật' : 'Tạo mới'}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({ name: '', description: '', price: '', features: '', icon: '' }); }} style={{ marginLeft: 12, background: '#bbb', color: '#fff', padding: '8px 18px', borderRadius: 6, fontWeight: 600 }}>Hủy</button>
          </form>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f4fa' }}>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Tên gói</th>
              <th style={{ padding: 10 }}>Mô tả</th>
              <th style={{ padding: 10 }}>Giá tiền</th>
              <th style={{ padding: 10 }}>Tính năng</th>
              <th style={{ padding: 10 }}>Biểu tượng</th>
              <th style={{ padding: 10 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg.id}>
                <td style={{ padding: 10 }}>{pkg.id}</td>
                <td style={{ padding: 10 }}>{pkg.name}</td>
                <td style={{ padding: 10 }}>{pkg.description}</td>
                <td style={{ padding: 10 }}>{pkg.price?.toLocaleString('vi-VN')}đ</td>
                <td style={{ padding: 10 }}>{pkg.features?.join(', ')}</td>
                <td style={{ padding: 10 }}>{pkg.icon}</td>
                <td style={{ padding: 10 }}>
                  <button onClick={() => handleEdit(pkg)} style={{ marginRight: 8, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600 }}>Sửa</button>
                  <button onClick={() => handleDelete(pkg.id!)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600 }}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div style={{ color: '#1976d2', marginTop: 12 }}>Đang xử lý...</div>}
      </div>
    </div>
  );
};

export default AdminPackageManager; 