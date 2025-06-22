import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const CustomerTestDetail = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chi tiết xét nghiệm
        </Typography>
        <Typography variant="body1">
          Thông tin chi tiết về xét nghiệm ADN.
        </Typography>
      </Box>
    </Container>
  );
};

export default CustomerTestDetail; 