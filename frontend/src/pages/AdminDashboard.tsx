import React, { useEffect, useState } from 'react';
import { getAllAppointments, updateTestStatus, enterTestResult } from '../api';
import { Appointment } from '../types';

const AdminDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [result, setResult] = useState<{ [key: number]: string }>({});
  const [status, setStatus] = useState<{ [key: number]: string }>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getAllAppointments();
      setAppointments(res.data.content || res.data);
    } catch (e) {
      setMessage('Không thể tải danh sách yêu cầu.');
    }
  };

  const handleStatusChange = (id: number, value: string) => {
    setStatus({ ...status, [id]: value });
  };

  const handleResultChange = (id: number, value: string) => {
    setResult({ ...result, [id]: value });
  };

  const handleUpdateStatus = async (id: number) => {
    try {
      await updateTestStatus(id, status[id]);
      setMessage('Cập nhật trạng thái thành công!');
      fetchAppointments();
    } catch {
      setMessage('Cập nhật trạng thái thất bại!');
    }
  };

  const handleEnterResult = async (id: number) => {
    try {
      await enterTestResult(id, result[id]);
      setMessage('Nhập kết quả thành công!');
      fetchAppointments();
    } catch {
      setMessage('Nhập kết quả thất bại!');
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0002', padding: 32 }}>
        <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>Quản lý yêu cầu xét nghiệm</h2>
        {message && <div style={{ color: message.includes('thành công') ? 'green' : 'red', marginBottom: 16, textAlign: 'center' }}>{message}</div>}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
            <thead style={{ background: '#f0f4fa' }}>
              <tr>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>ID</th>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>Khách hàng</th>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>Loại xét nghiệm</th>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>Ngày hẹn</th>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>Trạng thái</th>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>Cập nhật trạng thái</th>
                <th style={{ padding: 12, borderBottom: '2px solid #1976d2' }}>Nhập kết quả</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id} style={{ background: '#fafcff', borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 10 }}>{app.id}</td>
                  <td style={{ padding: 10 }}>{app.user.fullName}</td>
                  <td style={{ padding: 10 }}>{app.testTypeName}</td>
                  <td style={{ padding: 10 }}>{app.appointmentDate}</td>
                  <td style={{ padding: 10 }}>{app.status}</td>
                  <td style={{ padding: 10 }}>
                    <input
                      value={status[app.id] || ''}
                      onChange={e => handleStatusChange(app.id, e.target.value)}
                      placeholder="Trạng thái mới"
                      style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', fontSize: 15, minWidth: 120, marginRight: 8 }}
                    />
                    <button onClick={() => handleUpdateStatus(app.id)} style={{ padding: '8px 18px', borderRadius: 6, background: '#1976d2', color: '#fff', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #1976d233', transition: 'background 0.2s' }}>Cập nhật</button>
                  </td>
                  <td style={{ padding: 10 }}>
                    <input
                      value={result[app.id] || ''}
                      onChange={e => handleResultChange(app.id, e.target.value)}
                      placeholder="Kết quả xét nghiệm"
                      style={{ padding: 8, borderRadius: 6, border: '1px solid #bbb', fontSize: 15, minWidth: 120, marginRight: 8 }}
                    />
                    <button onClick={() => handleEnterResult(app.id)} style={{ padding: '8px 18px', borderRadius: 6, background: '#43a047', color: '#fff', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #43a04733', transition: 'background 0.2s' }}>Nhập kết quả</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 