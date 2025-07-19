import { useState } from 'react';
import { Card, Table, Button, Typography, Row, Col, Statistic, Tag } from 'antd';
import { UserAddOutlined, BankOutlined } from '@ant-design/icons';

const { Title } = Typography;

const RecruitmentPage = () => {
  const mockJobs = [
    { id: '1', title: 'Senior Developer', department: 'Engineering', status: 'active', applications: 24 },
    { id: '2', title: 'Marketing Manager', department: 'Marketing', status: 'active', applications: 18 },
  ];

  return (
    <div className="space-y-6">
      <Title level={2}>Recruitment</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card><Statistic title="Active Jobs" value={5} prefix={<BankOutlined />} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="Applications" value={42} prefix={<UserAddOutlined />} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title="Interviews" value={12} /></Card>
        </Col>
      </Row>
      <Card title="Job Postings">
        <Table dataSource={mockJobs} rowKey="id" />
      </Card>
    </div>
  );
};

export default RecruitmentPage;