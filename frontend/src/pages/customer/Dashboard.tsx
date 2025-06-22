import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Chip,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Alert
} from '@mui/material';
import {
  Science,
  Schedule,
  Assessment,
  Person,
  Pending,
  CalendarToday,
  Payment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { Test, Appointment, TestStatus, AppointmentStatus, CustomerDashboardDTO } from '../../types';
import api from '../../services/api';
import Loading from '../../components/ui/Loading';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState<CustomerDashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await api.get<CustomerDashboardDTO>('/api/dashboard/customer');
        setData(response.data);
      } catch (err) {
        setError('Không thể tải dữ liệu dashboard.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusChip = (status: TestStatus | AppointmentStatus) => {
    switch (status) {
      case TestStatus.COMPLETED:
      case AppointmentStatus.COMPLETED:
        return <Chip label="Hoàn thành" size="small" color="success" />;
      case TestStatus.PENDING:
        return <Chip label="Đang chờ" size="small" color="warning" icon={<Pending />} />;
      case AppointmentStatus.SCHEDULED:
      case AppointmentStatus.CONFIRMED:
        return <Chip label="Đã xác nhận" size="small" color="info" icon={<CalendarToday />} />;
      case TestStatus.FAILED:
      case AppointmentStatus.CANCELLED:
        return <Chip label="Đã hủy" size="small" color="error" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const StatCard = ({ title, value, icon, color, onClick }: any) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s',
        '&:hover': onClick ? { transform: 'translateY(-4px)' } : {},
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon, color, path }: any) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-4px)' },
      }}
      onClick={() => navigate(path)}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: color, mr: 2 }}>
            {icon}
          </Avatar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return <Loading message="Đang tải dữ liệu..." />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data) {
    return <Typography>Không có dữ liệu để hiển thị.</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Xin chào, {user?.fullName || 'Khách hàng'}! 👋
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Chào mừng bạn đến với hệ thống quản lý xét nghiệm ADN
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng số xét nghiệm"
            value={data.totalTests}
            icon={<Science />}
            color="primary.main"
            onClick={() => navigate('/tests')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Xét nghiệm đang chờ"
            value={data.pendingTests}
            icon={<Pending />}
            color="warning.main"
            onClick={() => navigate('/tests')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Lịch hẹn hôm nay"
            value={data.todayAppointments}
            icon={<CalendarToday />}
            color="info.main"
            onClick={() => navigate('/appointments')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng chi phí (VND)"
            value={`${Number(data.totalSpent).toLocaleString()}`}
            icon={<Payment />}
            color="success.main"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Thao tác nhanh
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Đặt xét nghiệm"
            description="Đăng ký xét nghiệm ADN mới"
            icon={<Science />}
            color="primary.main"
            path="/tests/new"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Đặt lịch hẹn"
            description="Lên lịch thu mẫu xét nghiệm"
            icon={<Schedule />}
            color="info.main"
            path="/appointments/new"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Xem kết quả"
            description="Kiểm tra kết quả xét nghiệm"
            icon={<Assessment />}
            color="success.main"
            path="/tests"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickActionCard
            title="Hồ sơ cá nhân"
            description="Cập nhật thông tin cá nhân"
            icon={<Person />}
            color="secondary.main"
            path="/profile"
          />
        </Grid>
      </Grid>

      {/* Recent Activity and Upcoming Appointments */}
      <Grid container spacing={3}>
        {/* Recent Tests */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Xét nghiệm gần đây</Typography>
              <Button size="small" onClick={() => navigate('/tests')}>
                Xem tất cả
              </Button>
            </Box>
            <List>
              {data.recentTests.length > 0 ? data.recentTests.map((test: Test, index: number) => (
                <React.Fragment key={test.id}>
                  <ListItem button onClick={() => navigate(`/tests/${test.id}`)}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}><Science /></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${test.testType.name} - #${test.id}`}
                      secondary={`Mã mẫu: ${test.sampleCode} • Ngày: ${new Date(test.createdAt).toLocaleDateString()}`}
                    />
                    {getStatusChip(test.status)}
                  </ListItem>
                  {index < data.recentTests.length - 1 && <Divider />}
                </React.Fragment>
              )) : <Typography sx={{ p: 2 }}>Không có xét nghiệm nào gần đây.</Typography>}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Lịch hẹn sắp tới</Typography>
              <Button size="small" onClick={() => navigate('/appointments')}>
                Xem tất cả
              </Button>
            </Box>
            <List>
              {data.upcomingAppointments.length > 0 ? data.upcomingAppointments.map((appointment: Appointment, index: number) => (
                <React.Fragment key={appointment.id}>
                  <ListItem button onClick={() => navigate(`/appointments/${appointment.id}`)}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'info.main' }}><Schedule /></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={appointment.testType.name}
                      secondary={`Ngày: ${new Date(appointment.appointmentDate).toLocaleString()}`}
                    />
                    {getStatusChip(appointment.status)}
                  </ListItem>
                  {index < data.upcomingAppointments.length - 1 && <Divider />}
                </React.Fragment>
              )) : <Typography sx={{ p: 2 }}>Không có lịch hẹn nào sắp tới.</Typography>}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerDashboard; 