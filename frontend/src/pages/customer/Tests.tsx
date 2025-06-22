import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CustomerTests = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Danh sách xét nghiệm
        </Typography>
        <Typography variant="body1">
          Quản lý các xét nghiệm ADN của bạn.
        </Typography>
      </Box>
    </Container>
  );
};

export default CustomerTests; 