import React, { useEffect, useState } from 'react';
import { createAppointment, getMyTests } from '../api';
import { Test } from '../types';

const CustomerDashboard: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [form, setForm] = useState({ testTypeName: '', appointmentDate: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await getMyTests();
      setTests(res.data.content || res.data);
    } catch (e) {
      setError('Không thể tải danh sách xét nghiệm.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await createAppointment(form);
      setSuccess('Tạo yêu cầu xét nghiệm thành công!');
      setForm({ testTypeName: '', appointmentDate: '', notes: '' });
      fetchTests();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Tạo yêu cầu thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: 32, marginBottom: 32 }}>
        <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>Tạo yêu cầu xét nghiệm</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
          <input name="testTypeName" placeholder="Loại xét nghiệm" value={form.testTypeName} onChange={handleChange} required style={{ flex: 1, minWidth: 180, padding: 12, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
          <input name="appointmentDate" type="datetime-local" value={form.appointmentDate} onChange={handleChange} required style={{ flex: 1, minWidth: 180, padding: 12, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
          <input name="notes" placeholder="Ghi chú (tuỳ chọn)" value={form.notes} onChange={handleChange} style={{ flex: 2, minWidth: 180, padding: 12, borderRadius: 6, border: '1px solid #bbb', fontSize: 16 }} />
          <button type="submit" disabled={loading} style={{ padding: '12px 32px', borderRadius: 6, background: '#1976d2', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #1976d233', transition: 'background 0.2s' }}>
            {loading ? 'Đang gửi...' : 'Tạo yêu cầu'}
          </button>
        </form>
        {error && <div style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 16, textAlign: 'center' }}>{success}</div>}
      </div>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: 32 }}>
        <h3 style={{ color: '#1976d2', marginBottom: 20, textAlign: 'center', letterSpacing: 1 }}>Danh sách xét nghiệm của bạn</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
            <thead style={{ background: '#f0f4fa' }}>
              <tr>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>ID</th>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>Loại xét nghiệm</th>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>Trạng thái</th>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>Kết quả</th>
              </tr>
            </thead>
            <tbody>
              {tests.map(test => (
                <tr key={test.id} style={{ background: '#fafcff', borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 10 }}>{test.id}</td>
                  <td style={{ padding: 10 }}>{test.testTypeName}</td>
                  <td style={{ padding: 10 }}>{test.status}</td>
                  <td style={{ padding: 10 }}>{test.resultData || <span style={{ color: '#888' }}>Chưa có</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard; 