import React, { useState } from 'react';
import { createTest } from '../../api';
import { useNavigate } from 'react-router-dom';

const TestForm: React.FC = () => {
  const [form, setForm] = useState({ sampleCode: '', testTypeName: '', status: '', totalAmount: '', paymentStatus: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createTest({
        ...form,
        totalAmount: Number(form.totalAmount)
      });
      navigate('/tests');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lưu xét nghiệm thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Tạo/Cập nhật xét nghiệm</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input name="sampleCode" placeholder="Mã mẫu" value={form.sampleCode} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <input name="testTypeName" placeholder="Loại xét nghiệm" value={form.testTypeName} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <input name="status" placeholder="Trạng thái" value={form.status} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <input name="totalAmount" placeholder="Tổng tiền" value={form.totalAmount} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <input name="paymentStatus" placeholder="Trạng thái thanh toán" value={form.paymentStatus} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <button type="submit" disabled={loading} style={{ background: '#1976d2', color: '#fff', padding: '12px 0', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{loading ? 'Đang lưu...' : 'Lưu'}</button>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
};

export default TestForm; 