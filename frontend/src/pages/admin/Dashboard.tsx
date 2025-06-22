import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bảng điều khiển quản trị
        </Typography>
        <Typography variant="body1">
          Quản lý hệ thống xét nghiệm ADN.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminDashboard; 