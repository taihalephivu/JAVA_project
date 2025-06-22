import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Science,
  LocalHospital,
  Security,
  Speed,
  CheckCircle,
  Phone,
  Email,
  LocationOn,
  Schedule,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Xét nghiệm ADN Cha Con',
      description: 'Xác định mối quan hệ cha con với độ chính xác 99.9%',
      icon: <Science />,
      price: '2,500,000 VND',
      duration: '3-5 ngày',
    },
    {
      title: 'Xét nghiệm ADN Mẹ Con',
      description: 'Xác định mối quan hệ mẹ con với độ chính xác cao',
      icon: <Science />,
      price: '2,500,000 VND',
      duration: '3-5 ngày',
    },
    {
      title: 'Xét nghiệm ADN Họ Hàng',
      description: 'Xác định mối quan hệ họ hàng, anh chị em',
      icon: <Science />,
      price: '3,000,000 VND',
      duration: '5-7 ngày',
    },
    {
      title: 'Xét nghiệm ADN Huyết Thống',
      description: 'Xác định mối quan hệ huyết thống tổng quát',
      icon: <Science />,
      price: '4,000,000 VND',
      duration: '7-10 ngày',
    },
  ];

  const features = [
    {
      title: 'Độ chính xác cao',
      description: 'Kết quả chính xác 99.9% với công nghệ hiện đại',
      icon: <CheckCircle color="success" />,
    },
    {
      title: 'Thời gian nhanh',
      description: 'Kết quả trong 3-10 ngày tùy loại xét nghiệm',
      icon: <Speed color="primary" />,
    },
    {
      title: 'Bảo mật tuyệt đối',
      description: 'Thông tin khách hàng được bảo mật hoàn toàn',
      icon: <Security color="info" />,
    },
    {
      title: 'Chuyên gia giàu kinh nghiệm',
      description: 'Đội ngũ bác sĩ, kỹ thuật viên có chuyên môn cao',
      icon: <LocalHospital color="secondary" />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3)',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Trung Tâm Xét Nghiệm ADN
            </Typography>
            <Typography variant="h5" paragraph>
              Uy tín - Chính xác - Bảo mật
            </Typography>
            <Typography variant="body1" paragraph sx={{ maxWidth: '600px', mx: 'auto' }}>
              Chúng tôi cung cấp các dịch vụ xét nghiệm ADN chất lượng cao với độ chính xác 99.9%, 
              thời gian nhanh chóng và bảo mật tuyệt đối thông tin khách hàng.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{ mr: 2 }}
              >
                Đăng ký ngay
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{ color: 'white', borderColor: 'white' }}
              >
                Đăng nhập
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Tại sao chọn chúng tôi?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Dịch vụ xét nghiệm
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip label={service.price} color="primary" />
                    <Chip label={service.duration} variant="outlined" />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/register')}
                  >
                    Đặt lịch
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Process Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Quy trình xét nghiệm
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom>1</Typography>
              <Typography variant="h6" gutterBottom>Đặt lịch</Typography>
              <Typography variant="body2" color="text.secondary">
                Đăng ký và chọn loại xét nghiệm phù hợp
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom>2</Typography>
              <Typography variant="h6" gutterBottom>Thu mẫu</Typography>
              <Typography variant="body2" color="text.secondary">
                Thu thập mẫu tại trung tâm hoặc tại nhà
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom>3</Typography>
              <Typography variant="h6" gutterBottom>Xét nghiệm</Typography>
              <Typography variant="body2" color="text.secondary">
                Phân tích mẫu trong phòng thí nghiệm hiện đại
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom>4</Typography>
              <Typography variant="h6" gutterBottom>Kết quả</Typography>
              <Typography variant="body2" color="text.secondary">
                Nhận kết quả chính xác và bảo mật
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Liên hệ với chúng tôi
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Thông tin liên hệ
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Địa chỉ"
                      secondary="123 Đường ABC, Quận 1, TP.HCM"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Điện thoại"
                      secondary="(028) 1234-5678"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary="info@dnatesting.com"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Schedule color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Giờ làm việc"
                      secondary="Thứ 2 - Thứ 7: 8:00 - 18:00"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Chứng nhận và giấy phép
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Giấy phép hoạt động"
                      secondary="Sở Y tế TP.HCM cấp"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Chứng nhận ISO"
                      secondary="ISO 15189:2012"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Đội ngũ chuyên môn"
                      secondary="Bác sĩ, kỹ thuật viên có chứng chỉ"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 