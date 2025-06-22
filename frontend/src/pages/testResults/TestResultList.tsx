import React, { useEffect, useState } from 'react';
import { getTestResults } from '../../api';
import { TestResult } from '../../types';

const TestResultList: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTestResults();
        setResults(res.data.content || res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải kết quả xét nghiệm');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Danh sách kết quả xét nghiệm</h2>
      <a href="/test-results/new" style={{ background: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, float: 'right', marginBottom: 16 }}>Tạo kết quả mới</a>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : results.length === 0 ? (
        <div>Không có kết quả xét nghiệm nào.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
          <thead>
            <tr style={{ background: '#f0f4fa' }}>
              <th style={{ padding: 10 }}>Mã kết quả</th>
              <th style={{ padding: 10 }}>Mã xét nghiệm</th>
              <th style={{ padding: 10 }}>Ngày thực hiện</th>
              <th style={{ padding: 10 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r.id}>
                <td style={{ padding: 10 }}>{r.id}</td>
                <td style={{ padding: 10 }}>{r.test?.id}</td>
                <td style={{ padding: 10 }}>{r.performedAt?.slice(0, 10)}</td>
                <td style={{ padding: 10 }}><a href={`/test-results/${r.id}`} style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TestResultList; 