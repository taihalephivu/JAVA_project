import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminTestTypes = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quản lý loại xét nghiệm
        </Typography>
        <Typography variant="body1">
          Quản lý các loại xét nghiệm ADN.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminTestTypes; 