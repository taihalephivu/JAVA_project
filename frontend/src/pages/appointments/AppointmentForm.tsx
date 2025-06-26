import React, { useState } from 'react';
import { createAppointment } from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';

const AppointmentForm: React.FC = () => {
  const location = useLocation();
  const initialTestTypeName = location.state?.testTypeName || '';
  const [form, setForm] = useState({ testTypeName: initialTestTypeName, appointmentDate: '', notes: '' });
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
      let appointmentDate = form.appointmentDate;
      if (/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
        appointmentDate = appointmentDate + 'T00:00:00';
      }
      const payload = { ...form, appointmentDate };
      await createAppointment(payload);
      navigate('/appointments');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đặt lịch thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Đặt lịch hẹn mới</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input name="testTypeName" placeholder="Loại xét nghiệm" value={form.testTypeName} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} disabled={!!initialTestTypeName} />
        <input name="appointmentDate" type="date" value={form.appointmentDate} onChange={handleChange} required style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }} />
        <textarea name="notes" placeholder="Ghi chú (nếu có)" value={form.notes} onChange={handleChange} style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb', minHeight: 60 }} />
        <button type="submit" disabled={loading} style={{ background: '#1976d2', color: '#fff', padding: '12px 0', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{loading ? 'Đang đặt lịch...' : 'Đặt lịch'}</button>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
};

export default AppointmentForm; 