import React from 'react';

const TestList: React.FC = () => (
  <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px #0001', padding: 32 }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Danh sách xét nghiệm</h2>
    <a href="/tests/new" style={{ background: '#1976d2', color: '#fff', padding: '10px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, float: 'right', marginBottom: 16 }}>Tạo xét nghiệm mới</a>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
      <thead>
        <tr style={{ background: '#f0f4fa' }}>
          <th style={{ padding: 10 }}>Mã xét nghiệm</th>
          <th style={{ padding: 10 }}>Mã mẫu</th>
          <th style={{ padding: 10 }}>Trạng thái</th>
          <th style={{ padding: 10 }}>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: 10 }}>T001</td>
          <td style={{ padding: 10 }}>S001</td>
          <td style={{ padding: 10 }}>Đang xử lý</td>
          <td style={{ padding: 10 }}><a href="/tests/1" style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
        </tr>
        <tr>
          <td style={{ padding: 10 }}>T002</td>
          <td style={{ padding: 10 }}>S002</td>
          <td style={{ padding: 10 }}>Hoàn thành</td>
          <td style={{ padding: 10 }}><a href="/tests/2" style={{ color: '#1976d2', fontWeight: 600 }}>Xem chi tiết</a></td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default TestList; 