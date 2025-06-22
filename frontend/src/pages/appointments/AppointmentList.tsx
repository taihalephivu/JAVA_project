import React, { useEffect, useState } from 'react';
import { getAppointments } from '../../api';
import { Appointment } from '../../types';

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAppointments();
        // Nếu backend trả về Page, lấy .content, nếu trả về mảng thì lấy trực tiếp
        setAppointments(res.data.content || res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải lịch hẹn');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Danh sách lịch hẹn</h2>
      <a href="/appointments/new" style={{ background: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, float: 'right', marginBottom: 16 }}>Đặt lịch mới</a>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : appointments.length === 0 ? (
        <div>Không có lịch hẹn nào.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
          <thead>
            <tr style={{ background: '#f0f4fa' }}>
              <th style={{ padding: 10 }}>Mã lịch hẹn</th>
              <th style={{ padding: 10 }}>Ngày hẹn</th>
              <th style={{ padding: 10 }}>Trạng thái</th>
              <th style={{ padding: 10 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                <td style={{ padding: 10 }}>{a.id}</td>
                <td style={{ padding: 10 }}>{a.appointmentDate?.slice(0, 10)}</td>
                <td style={{ padding: 10 }}>{a.status}</td>
                <td style={{ padding: 10 }}><a href={`/appointments/${a.id}`} style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList; 