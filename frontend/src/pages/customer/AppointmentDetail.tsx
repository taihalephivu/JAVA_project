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
import { Appointment, AppointmentStatus } from '../../types';
import api from '../../services/api';
import Loading from '../../components/ui/Loading';

const CustomerAppointmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/appointments/${id}`);
        setAppointment(response.data);
        setError(null);
      } catch (err: any) {
        setError('Không thể tải thông tin lịch hẹn.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  const getStatusChip = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.COMPLETED:
        return <Chip label="Hoàn thành" color="success" />;
      case AppointmentStatus.CONFIRMED:
        return <Chip label="Đã xác nhận" color="info" />;
      case AppointmentStatus.SCHEDULED:
        return <Chip label="Đã lên lịch" color="secondary" />;
      case AppointmentStatus.CANCELLED:
      case AppointmentStatus.NO_SHOW:
        return <Chip label="Đã hủy" color="error" />;
      default:
        return <Chip label={status} />;
    }
  };

  if (loading) return <Loading message="Đang tải thông tin lịch hẹn..." />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!appointment) return <Typography>Không tìm thấy lịch hẹn.</Typography>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Chi tiết lịch hẹn #{appointment.id}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            <Typography><b>Loại xét nghiệm:</b> {appointment.testType.name}</Typography>
            <Typography><b>Ngày hẹn:</b> {new Date(appointment.appointmentDate).toLocaleString()}</Typography>
            <Typography><b>Trạng thái:</b> {getStatusChip(appointment.status)}</Typography>
            {appointment.notes && (
              <Typography><b>Ghi chú:</b> {appointment.notes}</Typography>
            )}
            <Typography><b>Ngày tạo:</b> {new Date(appointment.createdAt).toLocaleString()}</Typography>
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

export default CustomerAppointmentDetail; 