import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTestResult } from '../../api';
import { TestResult } from '../../types';

const TestResultDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTestResult(id!);
        setResult(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải chi tiết kết quả xét nghiệm');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết kết quả xét nghiệm</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : result ? (
        <div style={{ fontSize: 16, marginBottom: 18 }}>
          <div><b>Mã kết quả:</b> {result.id}</div>
          <div><b>Mã xét nghiệm:</b> {result.test?.id}</div>
          <div><b>Kết quả:</b> {result.resultData}</div>
          <div><b>Diễn giải:</b> {result.interpretation}</div>
          <div><b>Khuyến nghị:</b> {result.recommendations}</div>
        </div>
      ) : (
        <div>Không tìm thấy kết quả xét nghiệm.</div>
      )}
      <a href="/test-results" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
    </div>
  );
};

export default TestResultDetail; 