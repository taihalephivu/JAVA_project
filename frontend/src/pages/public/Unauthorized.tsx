import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Security, Home, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Security color="error" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Truy cập bị từ chối
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên 
            nếu bạn cần quyền truy cập.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              Về trang chủ
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Unauthorized; 