import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointment, updateAppointment, deleteAppointment, updateAppointmentStatus } from '../../api';
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

function getCurrentUser() {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
  } catch {}
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
  const [confirming, setConfirming] = useState(false);
  const currentUser = getCurrentUser();
  const isOwner = appointment && currentUser && appointment.user && appointment.user.id === currentUser.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAppointment(id!);
        setAppointment(res.data as Appointment);
        setForm({
          testTypeName: (res.data as Appointment).testTypeName || '',
          appointmentDate: (res.data as Appointment).appointmentDate?.slice(0, 10) || '',
          status: (res.data as Appointment).status || '',
          notes: (res.data as Appointment).notes || ''
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

  const handleConfirm = async () => {
    if (!appointment) return;
    setConfirming(true);
    setError(null);
    setSuccess(null);
    try {
      await updateAppointmentStatus(appointment.id, 'CONFIRMED');
      setSuccess('Lịch hẹn đã được xác nhận và một xét nghiệm mới đã được tạo!');
      setAppointment({ ...appointment, status: 'CONFIRMED' });
      setForm({ ...form, status: 'CONFIRMED' });
      setTimeout(() => {
        navigate('/admin/tests');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xác nhận lịch thất bại');
    } finally {
      setConfirming(false);
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
          <div style={{ fontSize: 16, marginBottom: 18 }}>
            <div><b>Mã lịch hẹn:</b> {appointment.id}</div>
            <div><b>Ngày hẹn:</b> {appointment.appointmentDate?.slice(0, 10)}</div>
            <div><b>Loại xét nghiệm:</b> {appointment.testTypeName}</div>
            <div><b>Trạng thái:</b> {appointment.status}</div>
            <div><b>Ghi chú:</b> {appointment.notes || '-'}</div>
            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
              {appointment.status === 'SCHEDULED' && (
                <button type="button" onClick={handleConfirm} disabled={confirming} style={{ background: '#388e3c', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>
                  {confirming ? 'Đang xác nhận...' : 'Xác nhận lịch'}
                </button>
              )}
              <button type="button" onClick={handleDelete} disabled={deleting} style={{ background: '#d32f2f', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>
                {deleting ? 'Đang xóa...' : 'Xóa lịch hẹn'}
              </button>
            </div>
            {success && <div style={{ color: 'green', textAlign: 'center' }}>{success}</div>}
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
          </div>
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