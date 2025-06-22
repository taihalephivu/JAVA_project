import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminTests = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quản lý xét nghiệm
        </Typography>
        <Typography variant="body1">
          Quản lý tất cả xét nghiệm trong hệ thống.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminTests; 