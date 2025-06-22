import React, { useEffect, useState } from 'react';
import { getTests } from '../../api';
import { Test } from '../../types';

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

const TestList: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const role = getUserRole();
  const isAdmin = role === 'ROLE_ADMIN';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTests(isAdmin);
        setTests(res.data.content || res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải danh sách xét nghiệm');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAdmin]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Danh sách xét nghiệm</h2>
      <a href="/tests/new" style={{ background: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, float: 'right', marginBottom: 16 }}>Tạo xét nghiệm mới</a>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : tests.length === 0 ? (
        <div>Không có xét nghiệm nào.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
          <thead>
            <tr style={{ background: '#f0f4fa' }}>
              <th style={{ padding: 10 }}>Mã xét nghiệm</th>
              <th style={{ padding: 10 }}>Mã mẫu</th>
              <th style={{ padding: 10 }}>Trạng thái</th>
              <th style={{ padding: 10 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {tests.map(t => (
              <tr key={t.id}>
                <td style={{ padding: 10 }}>{t.id}</td>
                <td style={{ padding: 10 }}>{t.sampleCode}</td>
                <td style={{ padding: 10 }}>{t.status}</td>
                <td style={{ padding: 10 }}><a href={`/tests/${t.id}`} style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TestList; 