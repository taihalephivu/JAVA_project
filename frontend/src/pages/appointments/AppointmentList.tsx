import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AppointmentList = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Appointment List
        </Typography>
        <Typography variant="body1">
          List of all appointments will be displayed here.
        </Typography>
      </Box>
    </Container>
  );
};

export default AppointmentList; 