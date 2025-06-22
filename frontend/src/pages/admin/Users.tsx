import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AdminUsers = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quản lý người dùng
        </Typography>
        <Typography variant="body1">
          Quản lý danh sách người dùng và phân quyền.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminUsers; 