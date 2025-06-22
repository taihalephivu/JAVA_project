import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminAppointments = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quản lý lịch hẹn
        </Typography>
        <Typography variant="body1">
          Quản lý tất cả lịch hẹn thu mẫu.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminAppointments; 