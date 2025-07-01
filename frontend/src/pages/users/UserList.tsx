import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api';
import { User } from '../../types';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getUsers();
        setUsers(res.data as User[]);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải danh sách người dùng');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32, position: 'relative' }}>
      <button
        onClick={() => window.history.back()}
        style={{ position: 'absolute', left: 24, top: 24, background: 'none', color: '#1976d2', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', zIndex: 10, padding: 0, transition: 'color 0.18s', textDecoration: 'underline' }}
        onMouseOver={e => { e.currentTarget.style.color = '#0d47a1'; }}
        onMouseOut={e => { e.currentTarget.style.color = '#1976d2'; }}
      >Trở về</button>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Danh sách người dùng</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : users.length === 0 ? (
        <div>Không có người dùng nào.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
          <thead>
            <tr style={{ background: '#f0f4fa' }}>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Tên đăng nhập</th>
              <th style={{ padding: 10 }}>Họ tên</th>
              <th style={{ padding: 10 }}>Email</th>
              <th style={{ padding: 10 }}>Vai trò</th>
              <th style={{ padding: 10 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ padding: 10 }}>{u.id}</td>
                <td style={{ padding: 10 }}>{u.username}</td>
                <td style={{ padding: 10 }}>{u.fullName}</td>
                <td style={{ padding: 10 }}>{u.email}</td>
                <td style={{ padding: 10 }}>{u.role}</td>
                <td style={{ padding: 10 }}><a href={`/admin/users/${u.id}`} style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList; 