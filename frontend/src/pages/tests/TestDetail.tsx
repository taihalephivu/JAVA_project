import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TestDetail = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Test Detail
        </Typography>
        <Typography variant="body1">
          Test details will be displayed here.
        </Typography>
      </Box>
    </Container>
  );
};

export default TestDetail; 