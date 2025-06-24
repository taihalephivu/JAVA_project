import React, { useState } from 'react';

interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
}

const initialPackages: Package[] = [
  { id: 1, name: 'Gói cha con', description: 'Xác định quan hệ huyết thống cha - con.', price: 2000000 },
  { id: 2, name: 'Gói mẹ con', description: 'Xác định quan hệ huyết thống mẹ - con.', price: 2000000 },
  { id: 3, name: 'Gói anh/chị/em', description: 'Xác định quan hệ huyết thống anh/chị/em.', price: 2500000 },
  { id: 4, name: 'Gói pháp lý', description: 'Kết quả có giá trị pháp lý.', price: 3500000 },
];

const AdminPackageManager: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPackages(pkgs => pkgs.map(pkg => pkg.id === editingId ? { ...pkg, ...form, price: Number(form.price) } : pkg));
    } else {
      setPackages(pkgs => [...pkgs, { id: Date.now(), ...form, price: Number(form.price) }]);
    }
    setShowForm(false);
    setForm({ name: '', description: '', price: '' });
    setEditingId(null);
  };

  const handleEdit = (pkg: Package) => {
    setForm({ name: pkg.name, description: pkg.description, price: pkg.price.toString() });
    setEditingId(pkg.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Xóa gói này?')) return;
    setPackages(pkgs => pkgs.filter(pkg => pkg.id !== id));
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Quản lý gói xét nghiệm</h2>
      <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: '', description: '', price: '' }); }} style={{ background: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: 6, fontWeight: 600, marginBottom: 18 }}>Tạo gói mới</button>
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 24, background: '#f9f9f9', padding: 18, borderRadius: 8 }}>
          <input name="name" placeholder="Tên gói" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', marginBottom: 10 }} />
          <textarea name="description" placeholder="Mô tả" value={form.description} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', minHeight: 60, marginBottom: 10 }} />
          <input name="price" type="number" placeholder="Giá tiền" value={form.price} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bbb', marginBottom: 10 }} />
          <button type="submit" style={{ background: '#1976d2', color: '#fff', padding: '8px 18px', borderRadius: 6, fontWeight: 600 }}>{editingId ? 'Cập nhật' : 'Tạo mới'}</button>
          <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({ name: '', description: '', price: '' }); }} style={{ marginLeft: 12, background: '#bbb', color: '#fff', padding: '8px 18px', borderRadius: 6, fontWeight: 600 }}>Hủy</button>
        </form>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f4fa' }}>
            <th style={{ padding: 10 }}>ID</th>
            <th style={{ padding: 10 }}>Tên gói</th>
            <th style={{ padding: 10 }}>Mô tả</th>
            <th style={{ padding: 10 }}>Giá tiền</th>
            <th style={{ padding: 10 }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {packages.map(pkg => (
            <tr key={pkg.id}>
              <td style={{ padding: 10 }}>{pkg.id}</td>
              <td style={{ padding: 10 }}>{pkg.name}</td>
              <td style={{ padding: 10 }}>{pkg.description}</td>
              <td style={{ padding: 10 }}>{pkg.price.toLocaleString('vi-VN')}đ</td>
              <td style={{ padding: 10 }}>
                <button onClick={() => handleEdit(pkg)} style={{ marginRight: 8, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600 }}>Sửa</button>
                <button onClick={() => handleDelete(pkg.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontWeight: 600 }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPackageManager; 