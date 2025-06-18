import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to DNA Testing Service Dashboard
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard; 