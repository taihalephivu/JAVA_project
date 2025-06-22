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
} from '@mui/material';
import { User, Role } from '../../types';
import api from '../../services/api';
import Loading from '../../components/ui/Loading';

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get<User[]>('/api/users');
        setUsers(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải danh sách người dùng.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleChipColor = (role: Role) => {
    switch (role) {
      case Role.ROLE_ADMIN:
        return 'error';
      case Role.ROLE_MANAGER:
        return 'warning';
      case Role.ROLE_STAFF:
        return 'info';
      case Role.ROLE_CUSTOMER:
        return 'success';
      default:
        return 'default';
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <Loading message="Đang tải danh sách người dùng..." />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quản lý người dùng
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Vai trò</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role.replace('ROLE_', '')} 
                        color={getRoleChipColor(user.role)} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminUsers; 