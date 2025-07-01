import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTest, updateTest, deleteTest, checkIfTestResultExists, getTestResultByTestId } from '../../api';
import { Test, TestResult } from '../../types';
import TestResultForm from '../testResults/TestResultForm';

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

const TestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [form, setForm] = useState({ sampleCode: '', testTypeName: '', status: '', totalAmount: '', paymentStatus: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const role = getUserRole();
  const isAdmin = role === 'ROLE_ADMIN';

  // State for result check
  const [resultExists, setResultExists] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [loadingResult, setLoadingResult] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      setLoadingResult(true);
      setError(null);
      try {
        // Fetch test details
        const testRes = await getTest(id);
        setTest(testRes.data as Test);
        setForm({
          sampleCode: (testRes.data as Test).sampleCode || '',
          testTypeName: (testRes.data as Test).testTypeName || '',
          status: (testRes.data as Test).status || '',
          totalAmount: (testRes.data as Test).totalAmount?.toString() || '',
          paymentStatus: (testRes.data as Test).paymentStatus || ''
        });

        // Check if result exists
        const resultCheckRes = await checkIfTestResultExists(id);
        const exists = resultCheckRes.data as boolean;
        setResultExists(exists);

        if (exists) {
          const testResultRes = await getTestResultByTestId(id);
          setResult(testResultRes.data as TestResult);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
        setLoadingResult(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!test) return <div>Không tìm thấy xét nghiệm.</div>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32, position: 'relative' }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Chi tiết xét nghiệm</h2>
      <div style={{ fontSize: 16, marginBottom: 18, borderBottom: '1px solid #eee', paddingBottom: 18 }}>
        <div><b>Mã xét nghiệm:</b> {test.id}</div>
        <div><b>Mã mẫu:</b> {test.sampleCode}</div>
        <div><b>Loại xét nghiệm:</b> {test.testTypeName}</div>
        <div><b>Trạng thái:</b> {test.status}</div>
        <div><b>Tổng tiền:</b> {test.totalAmount?.toLocaleString('vi-VN')}đ</div>
        <div><b>Trạng thái thanh toán:</b> {test.paymentStatus}</div>
      </div>

      {isAdmin && (
        <div>
          {loadingResult ? (
            <div>Đang kiểm tra kết quả...</div>
          ) : resultExists && result ? (
            <div>
              <h3 style={{ color: '#388e3c' }}>Kết quả đã có</h3>
              <a href={`/admin/test-results/${result.id}`} style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết kết quả</a>
            </div>
          ) : (
            <TestResultForm testId={id!} sampleCode={test.sampleCode} />
          )}
        </div>
      )}

      <a href={isAdmin ? "/admin/tests" : "/tests"} style={{ color: '#1976d2', fontWeight: 600, marginTop: 24, display: 'inline-block' }}>Quay lại danh sách</a>
    </div>
  );
};

export default TestDetail; 