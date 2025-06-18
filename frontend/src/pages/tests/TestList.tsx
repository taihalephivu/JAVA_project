import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TestList = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Test List
        </Typography>
        <Typography variant="body1">
          List of all tests will be displayed here.
        </Typography>
      </Box>
    </Container>
  );
};

export default TestList; 