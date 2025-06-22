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
import { TestStatus, AppointmentStatus } from '../../types';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [stats, setStats] = useState({
    totalTests: 0,
    pendingTests: 0,
    completedTests: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    totalSpent: 0,
  });

  const [recentTests, setRecentTests] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    // TODO: Fetch customer dashboard data from API
    // This is mock data for now
    setStats({
      totalTests: 5,
      pendingTests: 2,
      completedTests: 3,
      totalAppointments: 8,
      todayAppointments: 1,
      totalSpent: 12500000,
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case TestStatus.COMPLETED:
      case AppointmentStatus.COMPLETED:
        return 'success';
      case TestStatus.PENDING:
      case AppointmentStatus.SCHEDULED:
        return 'warning';
      case TestStatus.FAILED:
      case AppointmentStatus.CANCELLED:
        return 'error';
      default:
        return 'default';
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
            value={stats.totalTests}
            icon={<Science />}
            color="primary.main"
            onClick={() => navigate('/tests')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Xét nghiệm đang chờ"
            value={stats.pendingTests}
            icon={<Pending />}
            color="warning.main"
            onClick={() => navigate('/tests')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Lịch hẹn hôm nay"
            value={stats.todayAppointments}
            icon={<CalendarToday />}
            color="info.main"
            onClick={() => navigate('/appointments')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng chi phí (VND)"
            value={`${stats.totalSpent.toLocaleString()}`}
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
              {[1, 2, 3].map((item) => (
                <React.Fragment key={item}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Science />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Xét nghiệm #${1000 + item} - ADN Cha Con`}
                      secondary={`Mã mẫu: SAMPLE${1000 + item} • Trạng thái: Đang xử lý`}
                    />
                    <Chip 
                      label="Đang xử lý" 
                      size="small" 
                      color="warning"
                      icon={<Pending />}
                    />
                  </ListItem>
                  {item < 3 && <Divider />}
                </React.Fragment>
              ))}
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
              {[1, 2, 3].map((item) => (
                <React.Fragment key={item}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'info.main' }}>
                        <Schedule />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Lịch hẹn #${2000 + item}`}
                      secondary={`Ngày mai, 10:00 AM • ADN Cha Con`}
                    />
                    <Chip 
                      label="Đã xác nhận" 
                      size="small" 
                      color="info"
                      icon={<CalendarToday />}
                    />
                  </ListItem>
                  {item < 3 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerDashboard; 