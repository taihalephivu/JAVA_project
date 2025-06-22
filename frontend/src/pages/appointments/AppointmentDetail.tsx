import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAppointment } from '../../api';
import { Appointment } from '../../types';

const AppointmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAppointment(id!);
        setAppointment(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải chi tiết lịch hẹn');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết lịch hẹn</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : appointment ? (
        <div style={{ fontSize: 16, marginBottom: 18 }}>
          <div><b>Mã lịch hẹn:</b> {appointment.id}</div>
          <div><b>Ngày hẹn:</b> {appointment.appointmentDate?.slice(0, 10)}</div>
          <div><b>Loại xét nghiệm:</b> {appointment.testTypeName}</div>
          <div><b>Trạng thái:</b> {appointment.status}</div>
          <div><b>Ghi chú:</b> {appointment.notes || '-'}</div>
        </div>
      ) : (
        <div>Không tìm thấy lịch hẹn.</div>
      )}
      <a href="/appointments" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
    </div>
  );
};

export default AppointmentDetail; 