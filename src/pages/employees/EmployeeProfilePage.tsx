import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Card,
  Avatar,
  Button,
  Tabs,
  Descriptions,
  Tag,
  Space,
  Row,
  Col,
  Timeline,
  Table,
  Progress,
  Typography,
  Divider,
  Upload,
  Form,
  Input,
  Select,
  DatePicker,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  BankOutlined,
  FileTextOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { RootState } from '../../store/store';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const EmployeeProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  // Mock employee data - replace with API call
  const employee = {
    id: '1',
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 234 567 8900',
    department: 'Engineering',
    position: 'Senior Developer',
    manager: 'Sarah Johnson',
    hireDate: '2022-01-15',
    status: 'active',
    salary: 85000,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 234 567 8901',
    },
  };

  const canEdit = user?.role === 'admin' || user?.role === 'hr' || user?.id === id;

  const leaveHistory = [
    {
      id: 1,
      type: 'Vacation',
      startDate: '2024-01-15',
      endDate: '2024-01-19',
      days: 5,
      status: 'approved',
    },
    {
      id: 2,
      type: 'Sick',
      startDate: '2024-02-10',
      endDate: '2024-02-11',
      days: 2,
      status: 'approved',
    },
  ];

  const attendanceData = [
    { date: '2024-01-01', clockIn: '09:00', clockOut: '17:30', hours: 8.5 },
    { date: '2024-01-02', clockIn: '08:45', clockOut: '17:15', hours: 8.5 },
    { date: '2024-01-03', clockIn: '09:15', clockOut: '17:45', hours: 8.5 },
  ];

  const performanceData = [
    { period: 'Q4 2023', rating: 4.5, goals: 5, completed: 4 },
    { period: 'Q3 2023', rating: 4.2, goals: 4, completed: 4 },
    { period: 'Q2 2023', rating: 4.0, goals: 6, completed: 5 },
  ];

  const documents = [
    {
      id: 1,
      name: 'Employment Contract',
      type: 'Contract',
      uploadDate: '2022-01-15',
    },
    {
      id: 2,
      name: 'ID Copy',
      type: 'Identification',
      uploadDate: '2022-01-15',
    },
  ];

  const handleEdit = () => {
    setEditMode(true);
    form.setFieldsValue({
      ...employee,
      hireDate: dayjs(employee.hireDate),
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      // Handle save logic here
      message.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const leaveColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'approved' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/employees')}
          >
            Back to Employees
          </Button>
          <Title level={2} className="mb-0">Employee Profile</Title>
        </div>
        {canEdit && !editMode && (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
            className="hr-button-primary"
          >
            Edit Profile
          </Button>
        )}
        {editMode && (
          <Space>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>Save Changes</Button>
          </Space>
        )}
      </div>

      {/* Profile Header */}
      <Card className="hr-card">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar
            size={120}
            src={employee.avatar}
            icon={<UserOutlined />}
            className="flex-shrink-0"
          />
          <div className="flex-1">
            <Title level={3} className="mb-2">
              {employee.firstName} {employee.lastName}
            </Title>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <UserOutlined className="text-muted" />
                <Text>{employee.position}</Text>
                <Divider type="vertical" />
                <Text>{employee.department}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <MailOutlined className="text-muted" />
                <Text>{employee.email}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneOutlined className="text-muted" />
                <Text>{employee.phone}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarOutlined className="text-muted" />
                <Text>Joined {dayjs(employee.hireDate).format('MMMM DD, YYYY')}</Text>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Tag color="green" className="mb-2">{employee.status.toUpperCase()}</Tag>
            <br />
            <Text className="text-muted">ID: {employee.employeeId}</Text>
          </div>
        </div>
      </Card>

      {/* Tabs Content */}
      <Card className="hr-card">
        <Tabs defaultActiveKey="personal">
          <TabPane tab="Personal Info" key="personal">
            {editMode ? (
              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[{ required: true, message: 'Please enter first name' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[{ required: true, message: 'Please enter last name' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, type: 'email' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                {/* Add more form fields */}
              </Form>
            ) : (
              <Descriptions column={{ xs: 1, sm: 2, md: 2 }} bordered>
                <Descriptions.Item label="Full Name">
                  {employee.firstName} {employee.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Employee ID">
                  {employee.employeeId}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {employee.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {employee.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Department">
                  {employee.department}
                </Descriptions.Item>
                <Descriptions.Item label="Position">
                  {employee.position}
                </Descriptions.Item>
                <Descriptions.Item label="Manager">
                  {employee.manager}
                </Descriptions.Item>
                <Descriptions.Item label="Hire Date">
                  {dayjs(employee.hireDate).format('MMMM DD, YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {employee.address.street}, {employee.address.city}, {employee.address.state} {employee.address.zipCode}
                </Descriptions.Item>
                <Descriptions.Item label="Emergency Contact">
                  {employee.emergencyContact.name} ({employee.emergencyContact.relationship})
                  <br />
                  {employee.emergencyContact.phone}
                </Descriptions.Item>
              </Descriptions>
            )}
          </TabPane>

          <TabPane tab="Leave History" key="leave">
            <div className="space-y-4">
              <Row gutter={16}>
                <Col span={8}>
                  <Card className="text-center">
                    <Title level={4}>15</Title>
                    <Text className="text-muted">Vacation Days Left</Text>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="text-center">
                    <Title level={4}>8</Title>
                    <Text className="text-muted">Sick Days Left</Text>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="text-center">
                    <Title level={4}>3</Title>
                    <Text className="text-muted">Personal Days Left</Text>
                  </Card>
                </Col>
              </Row>
              <Table
                columns={leaveColumns}
                dataSource={leaveHistory}
                rowKey="id"
                pagination={false}
              />
            </div>
          </TabPane>

          <TabPane tab="Attendance" key="attendance">
            <div className="space-y-4">
              <Row gutter={16}>
                <Col span={8}>
                  <Card className="text-center">
                    <Progress
                      type="circle"
                      percent={95}
                      format={percent => `${percent}%`}
                      strokeColor="#52c41a"
                    />
                    <div className="mt-2">
                      <Text className="text-muted">Attendance Rate</Text>
                    </div>
                  </Card>
                </Col>
                <Col span={16}>
                  <Card>
                    <Title level={5}>This Month's Summary</Title>
                    <Descriptions column={2}>
                      <Descriptions.Item label="Present Days">22</Descriptions.Item>
                      <Descriptions.Item label="Absent Days">1</Descriptions.Item>
                      <Descriptions.Item label="Late Arrivals">2</Descriptions.Item>
                      <Descriptions.Item label="Early Departures">0</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane tab="Performance" key="performance">
            <div className="space-y-4">
              {performanceData.map((period, index) => (
                <Card key={index}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Title level={5}>{period.period}</Title>
                      <Text className="text-muted">Performance Review</Text>
                    </div>
                    <div className="text-right">
                      <Title level={4} className="text-success mb-0">
                        {period.rating}/5.0
                      </Title>
                    </div>
                  </div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Text>Goals Achievement</Text>
                      <Progress
                        percent={(period.completed / period.goals) * 100}
                        format={() => `${period.completed}/${period.goals}`}
                      />
                    </Col>
                    <Col span={12}>
                      <Text>Overall Rating</Text>
                      <Progress
                        percent={(period.rating / 5) * 100}
                        strokeColor="#1890ff"
                        format={() => `${period.rating}/5.0`}
                      />
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </TabPane>

          <TabPane tab="Documents" key="documents">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Title level={5}>Employee Documents</Title>
                {canEdit && (
                  <Upload>
                    <Button icon={<UploadOutlined />}>Upload Document</Button>
                  </Upload>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id} size="small" className="hr-card">
                    <div className="flex items-center space-x-3">
                      <FileTextOutlined className="text-2xl text-primary" />
                      <div className="flex-1">
                        <Text strong>{doc.name}</Text>
                        <br />
                        <Text className="text-muted text-sm">{doc.type}</Text>
                        <br />
                        <Text className="text-muted text-xs">
                          {dayjs(doc.uploadDate).format('MMM DD, YYYY')}
                        </Text>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default EmployeeProfilePage;