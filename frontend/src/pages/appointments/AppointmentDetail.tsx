import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AppointmentDetail = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Appointment Detail
        </Typography>
        <Typography variant="body1">
          Appointment details will be displayed here.
        </Typography>
      </Box>
    </Container>
  );
};

export default AppointmentDetail; 