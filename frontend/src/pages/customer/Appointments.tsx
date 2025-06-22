import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CustomerAppointments = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lịch hẹn
        </Typography>
        <Typography variant="body1">
          Quản lý lịch hẹn thu mẫu xét nghiệm.
        </Typography>
      </Box>
    </Container>
  );
};

export default CustomerAppointments; 