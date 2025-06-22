import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Role } from '../../types';
import api from '../../services/api';
import { setCredentials } from '../../features/auth/authSlice';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  fullName: yup.string().required('Full name is required'),
  phoneNumber: yup.string().optional(),
  role: yup.string().oneOf(Object.values(Role)).required('Role is required'),
});

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  role: Role;
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/auth/signup', data);
      const { user, token } = response.data;
      dispatch(setCredentials({ user, token }));
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra trong quá trình đăng ký.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              {...register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              autoComplete="name"
              {...register('fullName')}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              autoComplete="tel"
              {...register('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              select
              id="role"
              label="Role"
              {...register('role')}
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value={Role.ROLE_CUSTOMER}>Customer</MenuItem>
              <MenuItem value={Role.ROLE_STAFF}>Staff</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 