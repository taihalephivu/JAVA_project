import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { TestType } from '../../types';

const RegisterTest = () => {
  const navigate = useNavigate();
  const [testTypes, setTestTypes] = useState<TestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    testTypeId: '',
    sampleCode: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestTypes = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/test-types/active');
        setTestTypes(res.data);
        setError(null);
      } catch (err: any) {
        setError('Không thể tải danh sách loại xét nghiệm.');
      } finally {
        setLoading(false);
      }
    };
    fetchTestTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        testType: { id: Number(form.testTypeId) },
        sampleCode: form.sampleCode,
        notes: form.notes,
      };
      const res = await api.post('/api/tests', payload);
      navigate(`/tests/${res.data.id}`);
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || 'Đăng ký xét nghiệm thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Box textAlign="center" mt={6}><CircularProgress /><Typography mt={2}>Đang tải loại xét nghiệm...</Typography></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Đăng ký xét nghiệm mới
          </Typography>
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              select
              required
              fullWidth
              label="Loại xét nghiệm"
              name="testTypeId"
              value={form.testTypeId}
              onChange={handleChange}
              margin="normal"
            >
              {testTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              required
              fullWidth
              label="Mã mẫu"
              name="sampleCode"
              value={form.sampleCode}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Ghi chú"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : 'Đăng ký'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterTest; 