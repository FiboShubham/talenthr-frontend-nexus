import { useState } from 'react';
import { Card, Table, Button, Typography, Row, Col, Statistic, Tag, Space } from 'antd';
import { DollarOutlined, FileTextOutlined, DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;

const PayrollPage = () => {
  const mockPayroll = [
    { id: '1', employee: 'John Doe', period: '2024-01', gross: 8500, net: 6800, status: 'paid' },
    { id: '2', employee: 'Sarah Johnson', period: '2024-01', gross: 11000, net: 8800, status: 'processed' },
  ];

  return (
    <div className="space-y-6">
      <Title level={2}>Payroll Management</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card><Statistic title="Total Payroll" value={285000} prefix={<DollarOutlined />} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="Employees Paid" value={156} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="Pending" value={8} /></Card>
        </Col>
      </Row>
      <Card title="Payroll Records">
        <Table dataSource={mockPayroll} rowKey="id" />
      </Card>
    </div>
  );
};

export default PayrollPage;