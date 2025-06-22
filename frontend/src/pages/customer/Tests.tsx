import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  TablePagination,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Test, TestStatus, PaginatedResponse } from '../../types';
import api from '../../services/api';
import Loading from '../../components/ui/Loading';

const CustomerTests = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<PaginatedResponse<Test> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/tests/my-tests', {
          params: {
            page: page,
            size: rowsPerPage,
            sort: 'createdAt,desc',
          },
        });
        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải danh sách xét nghiệm.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [page, rowsPerPage]);

  const getStatusChip = (status: TestStatus) => {
    switch (status) {
      case TestStatus.COMPLETED:
        return <Chip label="Hoàn thành" size="small" color="success" />;
      case TestStatus.PENDING:
        return <Chip label="Đang chờ" size="small" color="default" />;
      case TestStatus.IN_PROGRESS:
        return <Chip label="Đang xử lý" size="small" color="info" />;
      case TestStatus.SAMPLE_COLLECTED:
        return <Chip label="Đã lấy mẫu" size="small" color="secondary" />;
      case TestStatus.CANCELLED:
      case TestStatus.FAILED:
        return <Chip label="Đã hủy" size="small" color="error" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && !data) {
    return <Loading message="Đang tải danh sách xét nghiệm..." />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Danh sách xét nghiệm
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="tests table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Loại xét nghiệm</TableCell>
                  <TableCell>Mã mẫu</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.content.map((test) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={test.id}>
                    <TableCell>#{test.id}</TableCell>
                    <TableCell>{test.testType.name}</TableCell>
                    <TableCell>{test.sampleCode}</TableCell>
                    <TableCell>{new Date(test.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusChip(test.status)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Xem chi tiết">
                        <IconButton onClick={() => navigate(`/tests/${test.id}`)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {data && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomerTests; 