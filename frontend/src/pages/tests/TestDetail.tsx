import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTest } from '../../api';
import { Test } from '../../types';

const TestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getTest(id!);
        setTest(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải chi tiết xét nghiệm');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết xét nghiệm</h2>
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : test ? (
        <div style={{ fontSize: 16, marginBottom: 18 }}>
          <div><b>Mã xét nghiệm:</b> {test.id}</div>
          <div><b>Mã mẫu:</b> {test.sampleCode}</div>
          <div><b>Loại xét nghiệm:</b> {test.testTypeName}</div>
          <div><b>Trạng thái:</b> {test.status}</div>
          <div><b>Tổng tiền:</b> {test.totalAmount?.toLocaleString('vi-VN')}đ</div>
          <div><b>Trạng thái thanh toán:</b> {test.paymentStatus}</div>
        </div>
      ) : (
        <div>Không tìm thấy xét nghiệm.</div>
      )}
      <a href="/tests" style={{ color: '#1976d2', fontWeight: 600 }}>Quay lại danh sách</a>
    </div>
  );
};

export default TestDetail; 