import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointment, updateAppointment, deleteAppointment } from '../../api';
import { Appointment } from '../../types';

function getUserRole(): string | null {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.role || null;
    }
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    }
  } catch {
    return null;
  }
  return null;
}

const AppointmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [form, setForm] = useState({ testTypeName: '', appointmentDate: '', status: '', notes: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const role = getUserRole();
  const isAdmin = role === 'ROLE_ADMIN';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAppointment(id!);
        setAppointment(res.data);
        setForm({
          testTypeName: res.data.testTypeName || '',
          appointmentDate: res.data.appointmentDate?.slice(0, 10) || '',
          status: res.data.status || '',
          notes: res.data.notes || ''
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải chi tiết lịch hẹn');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateAppointment(id!, form);
      setSuccess('Cập nhật lịch hẹn thành công!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Cập nhật lịch hẹn thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa lịch hẹn này?')) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteAppointment(id!);
      navigate('/appointments');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xóa lịch hẹn thất bại');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết lịch hẹn</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : appointment ? (
        isAdmin ? (
          <form onSubmit={handleSubmit} style={{ fontSize: 16, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><b>Mã lịch hẹn:</b> {appointment.id}</div>
            <input name="testTypeName" placeholder="Loại xét nghiệm" value={form.testTypeName} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
            <input name="appointmentDate" type="date" value={form.appointmentDate} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }} />
            <select name="status" value={form.status} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb' }}>
              <option value="">Chọn trạng thái</option>
              <option value="PENDING">Chờ xác nhận</option>
              <option value="CONFIRMED">Đã xác nhận</option>
              <option value="CANCELLED">Đã hủy</option>
              <option value="COMPLETED">Đã hoàn thành</option>
            </select>
            <textarea name="notes" placeholder="Ghi chú" value={form.notes} onChange={handleChange} style={{ padding: 10, borderRadius: 6, border: '1px solid #bbb', minHeight: 60 }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" disabled={saving} style={{ background: '#1976d2', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
              <button type="button" onClick={handleDelete} disabled={deleting} style={{ background: '#d32f2f', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>{deleting ? 'Đang xóa...' : 'Xóa lịch hẹn'}</button>
            </div>
            {success && <div style={{ color: 'green', textAlign: 'center' }}>{success}</div>}
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          </form>
        ) : (
          <div style={{ fontSize: 16, marginBottom: 18 }}>
            <div><b>Mã lịch hẹn:</b> {appointment.id}</div>
            <div><b>Ngày hẹn:</b> {appointment.appointmentDate?.slice(0, 10)}</div>
            <div><b>Loại xét nghiệm:</b> {appointment.testTypeName}</div>
            <div><b>Trạng thái:</b> {appointment.status}</div>
            <div><b>Ghi chú:</b> {appointment.notes || '-'}</div>
          </div>
        )
      ) : (
        <div>Không tìm thấy lịch hẹn.</div>
      )}
      <a href="/appointments" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
    </div>
  );
};

export default AppointmentDetail; 