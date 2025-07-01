import React, { useEffect, useState } from 'react';
import { getAppointments } from '../../api';
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

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const role = getUserRole();
  const isAdmin = role === 'ROLE_ADMIN';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAppointments(isAdmin);
        // Nếu backend trả về Page, lấy .content, nếu trả về mảng thì lấy trực tiếp
        setAppointments((res.data as any).content || res.data as Appointment[]);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải lịch hẹn');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAdmin]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: 'none', borderRadius: 14, padding: '0 0 32px 0', position: 'relative' }}>
      <button
        onClick={() => window.history.back()}
        style={{ position: 'absolute', left: 24, top: 24, background: 'none', color: '#1976d2', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', zIndex: 10, padding: 0, transition: 'color 0.18s', textDecoration: 'underline' }}
        onMouseOver={e => { e.currentTarget.style.color = '#0d47a1'; }}
        onMouseOut={e => { e.currentTarget.style.color = '#1976d2'; }}
      >Trở về</button>
      <div style={{ background: '#e3f0fd', borderTopLeftRadius: 14, borderTopRightRadius: 14, padding: '24px 32px 12px 32px', borderLeft: '6px solid #1976d2', boxShadow: '0 2px 12px #1976d211' }}>
        <h2 style={{ color: '#1976d2', marginBottom: 0 }}>Danh sách lịch hẹn</h2>
      </div>
      <div style={{ background: '#fff', borderBottomLeftRadius: 14, borderBottomRightRadius: 14, boxShadow: '0 2px 12px #0001', padding: 32, marginBottom: 24 }}>
        {!isAdmin && (
          <a href="/appointments/new" style={{ background: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, float: 'right', marginBottom: 16 }}>Đặt lịch mới</a>
        )}
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
                <tr key={a.id} style={{ borderLeft: '4px solid #1976d2', background: '#fafdff' }}>
                  <td style={{ padding: 10 }}>{a.id}</td>
                  <td style={{ padding: 10 }}>{a.appointmentDate?.slice(0, 10)}</td>
                  <td style={{ padding: 10 }}>
                    <span style={{
                      display: 'inline-block',
                      fontWeight: 600,
                      borderRadius: 6,
                      padding: '4px 12px',
                      color: '#fff',
                      background: a.status === 'SCHEDULED' ? '#1976d2'
                        : a.status === 'CONFIRMED' ? '#388e3c'
                        : a.status === 'COMPLETED' ? '#4caf50'
                        : a.status === 'CANCELLED' ? '#d32f2f'
                        : a.status === 'NO_SHOW' ? '#ff9800'
                        : '#888',
                      fontSize: 14
                    }}>{a.status === 'SCHEDULED' ? 'Đã lên lịch'
                      : a.status === 'CONFIRMED' ? 'Đã xác nhận'
                      : a.status === 'COMPLETED' ? 'Đã hoàn thành'
                      : a.status === 'CANCELLED' ? 'Đã hủy'
                      : a.status === 'NO_SHOW' ? 'Không đến'
                      : a.status}
                    </span>
                  </td>
                  <td style={{ padding: 10 }}>
                    <a href={isAdmin ? `/admin/appointments/${a.id}` : `/appointments/${a.id}`} style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AppointmentList; 