import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Button,
  Divider,
  Alert,
  Stack,
} from '@mui/material';
import { Test, TestStatus } from '../../types';
import api from '../../services/api';
import Loading from '../../components/ui/Loading';

const CustomerTestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/tests/${id}`);
        setTest(response.data);
        setError(null);
      } catch (err: any) {
        setError('Không thể tải thông tin xét nghiệm.');
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, [id]);

  const getStatusChip = (status: TestStatus) => {
    switch (status) {
      case TestStatus.COMPLETED:
        return <Chip label="Hoàn thành" color="success" />;
      case TestStatus.PENDING:
        return <Chip label="Đang chờ" color="default" />;
      case TestStatus.IN_PROGRESS:
        return <Chip label="Đang xử lý" color="info" />;
      case TestStatus.SAMPLE_COLLECTED:
        return <Chip label="Đã lấy mẫu" color="secondary" />;
      case TestStatus.CANCELLED:
      case TestStatus.FAILED:
        return <Chip label="Đã hủy" color="error" />;
      default:
        return <Chip label={status} />;
    }
  };

  if (loading) return <Loading message="Đang tải thông tin xét nghiệm..." />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!test) return <Typography>Không tìm thấy xét nghiệm.</Typography>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Chi tiết xét nghiệm #{test.id}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            <Typography><b>Loại xét nghiệm:</b> {test.testType.name}</Typography>
            <Typography><b>Mã mẫu:</b> {test.sampleCode}</Typography>
            <Typography><b>Ngày tạo:</b> {new Date(test.createdAt).toLocaleString()}</Typography>
            <Typography><b>Trạng thái:</b> {getStatusChip(test.status)}</Typography>
            <Typography><b>Tổng chi phí:</b> {test.totalAmount.toLocaleString()} VND</Typography>
            <Typography><b>Trạng thái thanh toán:</b> {test.paymentStatus}</Typography>
            {test.sampleCollectionDate && (
              <Typography><b>Ngày lấy mẫu:</b> {new Date(test.sampleCollectionDate).toLocaleString()}</Typography>
            )}
            {test.expectedCompletionDate && (
              <Typography><b>Ngày dự kiến hoàn thành:</b> {new Date(test.expectedCompletionDate).toLocaleString()}</Typography>
            )}
            {test.actualCompletionDate && (
              <Typography><b>Ngày hoàn thành:</b> {new Date(test.actualCompletionDate).toLocaleString()}</Typography>
            )}
          </Stack>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomerTestDetail; 