import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Typography, 
  Progress, 
  List, 
  Avatar,
  Tag,
  Button,
  Space,
  Divider
} from 'antd';
import {
  TeamOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TrophyOutlined,
  RiseOutlined,
  UserAddOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { RootState } from '../../store/store';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data - replace with real data from Redux store
  const stats = {
    totalEmployees: 156,
    activeEmployees: 142,
    pendingLeaves: 8,
    attendanceToday: 89.5,
    monthlyPayroll: 285000,
  };

  const recentActivities = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'submitted a leave request',
      time: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=40&h=40&fit=crop&crop=face',
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'clocked in',
      time: '3 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    },
    {
      id: 3,
      user: 'Emily Davis',
      action: 'completed onboarding',
      time: '5 hours ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Meeting',
      time: '10:00 AM',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Performance Review - John Doe',
      time: '2:00 PM',
      type: 'review',
    },
    {
      id: 3,
      title: 'New Hire Orientation',
      time: '4:00 PM',
      type: 'onboarding',
    },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="hr-card p-6 bg-gradient-primary text-white rounded-xl">
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={2} className="text-white mb-2">
              {getGreeting()}, {user?.name}! 👋
            </Title>
            <Text className="text-primary-light text-lg">
              Welcome back to your TalentHR dashboard
            </Text>
          </Col>
          <Col>
            <div className="text-right">
              <Text className="text-primary-light block">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              <Text className="text-white text-2xl font-mono">
                {currentTime.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
            </div>
          </Col>
        </Row>
      </div>

      {/* Quick Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hr-card">
            <Statistic
              title="Total Employees"
              value={stats.totalEmployees}
              prefix={<TeamOutlined className="text-primary" />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress 
              percent={(stats.activeEmployees / stats.totalEmployees) * 100} 
              size="small" 
              strokeColor="#52c41a"
              showInfo={false}
            />
            <Text className="text-muted text-sm">
              {stats.activeEmployees} active
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="hr-card">
            <Statistic
              title="Pending Leaves"
              value={stats.pendingLeaves}
              prefix={<CalendarOutlined className="text-warning" />}
              valueStyle={{ color: '#faad14' }}
            />
            <Text className="text-muted text-sm">
              Requires approval
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="hr-card">
            <Statistic
              title="Attendance Today"
              value={stats.attendanceToday}
              suffix="%"
              prefix={<ClockCircleOutlined className="text-success" />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress 
              percent={stats.attendanceToday} 
              size="small" 
              strokeColor="#52c41a"
              showInfo={false}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="hr-card">
            <Statistic
              title="Monthly Payroll"
              value={stats.monthlyPayroll}
              prefix={<DollarOutlined className="text-primary" />}
              precision={0}
              valueStyle={{ color: '#1890ff' }}
            />
            <Text className="text-muted text-sm">
              This month
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card 
            title="Recent Activities" 
            className="hr-card h-full"
            extra={<Button type="link">View All</Button>}
          >
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <div>
                        <Text strong>{item.user}</Text>
                        <Text className="ml-2">{item.action}</Text>
                      </div>
                    }
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Upcoming Events */}
        <Col xs={24} lg={12}>
          <Card 
            title="Today's Schedule" 
            className="hr-card h-full"
            extra={<Button type="link">View Calendar</Button>}
          >
            <Space direction="vertical" size="middle" className="w-full">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div>
                    <Text strong>{event.title}</Text>
                    <br />
                    <Text className="text-muted">{event.time}</Text>
                  </div>
                  <Tag color={
                    event.type === 'meeting' ? 'blue' :
                    event.type === 'review' ? 'orange' : 'green'
                  }>
                    {event.type}
                  </Tag>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Employee Specific Content */}
      {user?.role === 'employee' && (
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="My Leave Balance" className="hr-card">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Statistic
                    title="Vacation"
                    value={15}
                    suffix="days"
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Sick"
                    value={8}
                    suffix="days"
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Personal"
                    value={3}
                    suffix="days"
                    valueStyle={{ color: '#faad14' }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Quick Actions" className="hr-card">
              <Space direction="vertical" size="middle" className="w-full">
                <Button type="primary" icon={<CalendarOutlined />} block>
                  Apply for Leave
                </Button>
                <Button icon={<ClockCircleOutlined />} block>
                  View Attendance
                </Button>
                <Button icon={<DollarOutlined />} block>
                  Download Payslip
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      )}

      {/* Admin/HR Specific Content */}
      {(user?.role === 'admin' || user?.role === 'hr') && (
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <Card title="Department Overview" className="hr-card">
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex justify-between items-center">
                  <Text>Engineering</Text>
                  <Text strong>45 employees</Text>
                </div>
                <Progress percent={85} size="small" strokeColor="#1890ff" />
                
                <div className="flex justify-between items-center">
                  <Text>Sales</Text>
                  <Text strong>32 employees</Text>
                </div>
                <Progress percent={70} size="small" strokeColor="#52c41a" />
                
                <div className="flex justify-between items-center">
                  <Text>Marketing</Text>
                  <Text strong>18 employees</Text>
                </div>
                <Progress percent={90} size="small" strokeColor="#faad14" />
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Recruitment Pipeline" className="hr-card">
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex justify-between items-center">
                  <Text>Applications</Text>
                  <Text strong>24</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text>Interviews</Text>
                  <Text strong>8</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text>Offers</Text>
                  <Text strong>3</Text>
                </div>
                <Divider />
                <Button type="primary" icon={<UserAddOutlined />} block>
                  View All Candidates
                </Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Performance Metrics" className="hr-card">
              <Space direction="vertical" size="small" className="w-full">
                <Statistic
                  title="Average Performance"
                  value={4.2}
                  suffix="/ 5.0"
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <Statistic
                  title="Reviews Completed"
                  value={85}
                  suffix="%"
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <Progress percent={85} size="small" strokeColor="#1890ff" />
              </Space>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;