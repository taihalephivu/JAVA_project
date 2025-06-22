import React, { useState } from 'react';
import { createTestResult } from '../../api';
import { useNavigate } from 'react-router-dom';

const TestResultForm: React.FC = () => {
  const [form, setForm] = useState({ testId: '', resultData: '', interpretation: '', recommendations: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createTestResult({
        ...form,
        test: { id: Number(form.testId) }
      });
      navigate('/test-results');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lưu kết quả thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Tạo/Cập nhật kết quả xét nghiệm</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input name="testId" placeholder="Mã xét nghiệm" value={form.testId} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <textarea name="resultData" placeholder="Kết quả" value={form.resultData} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb', minHeight: 60 }} />
        <textarea name="interpretation" placeholder="Diễn giải" value={form.interpretation} onChange={handleChange} style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb', minHeight: 60 }} />
        <textarea name="recommendations" placeholder="Khuyến nghị" value={form.recommendations} onChange={handleChange} style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb', minHeight: 60 }} />
        <button type="submit" disabled={loading} style={{ background: '#1976d2', color: '#fff', padding: '12px 0', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{loading ? 'Đang lưu...' : 'Lưu'}</button>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
};

export default TestResultForm; 