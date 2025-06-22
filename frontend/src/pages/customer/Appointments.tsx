import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Appointment, AppointmentStatus, PaginatedResponse } from '../../types';
import api from '../../services/api';
import Loading from '../../components/ui/Loading';

const CustomerAppointments = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<PaginatedResponse<Appointment> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/appointments/my-appointments', {
          params: {
            page: page,
            size: rowsPerPage,
            sort: 'appointmentDate,desc',
          },
        });
        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải danh sách lịch hẹn.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [page, rowsPerPage]);

  const getStatusChip = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.COMPLETED:
        return <Chip label="Hoàn thành" size="small" color="success" />;
      case AppointmentStatus.CONFIRMED:
        return <Chip label="Đã xác nhận" size="small" color="info" />;
      case AppointmentStatus.SCHEDULED:
        return <Chip label="Đã lên lịch" size="small" color="secondary" />;
      case AppointmentStatus.CANCELLED:
      case AppointmentStatus.NO_SHOW:
        return <Chip label="Đã hủy" size="small" color="error" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && !data) {
    return <Loading message="Đang tải danh sách lịch hẹn..." />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Danh sách lịch hẹn
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="appointments table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Loại xét nghiệm</TableCell>
                  <TableCell>Ngày hẹn</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.content.map((appointment) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={appointment.id}>
                    <TableCell>#{appointment.id}</TableCell>
                    <TableCell>{appointment.testType.name}</TableCell>
                    <TableCell>{new Date(appointment.appointmentDate).toLocaleString()}</TableCell>
                    <TableCell>{getStatusChip(appointment.status)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Xem chi tiết">
                        <IconButton onClick={() => navigate(`/appointments/${appointment.id}`)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {data && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomerAppointments; 