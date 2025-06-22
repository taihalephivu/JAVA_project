import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminReports = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Báo cáo thống kê
        </Typography>
        <Typography variant="body1">
          Xem báo cáo và thống kê hệ thống.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminReports; 