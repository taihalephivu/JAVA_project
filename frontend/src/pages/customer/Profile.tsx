import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CustomerProfile = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hồ sơ cá nhân
        </Typography>
        <Typography variant="body1">
          Quản lý thông tin cá nhân và cài đặt tài khoản.
        </Typography>
      </Box>
    </Container>
  );
};

export default CustomerProfile; 