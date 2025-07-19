import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  Button,
  Table,
  Typography,
  Row,
  Col,
  Statistic,
  Tag,
  DatePicker,
  Select,
  Space,
  Progress,
  Timeline,
  Modal,
  Form,
  Input,
  message,
} from 'antd';
import {
  ClockCircleOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  CalendarOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { RootState } from '../../store/store';
import { AttendanceRecord, clockIn, clockOut, startBreak, endBreak } from '../../store/slices/attendanceSlice';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AttendancePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { records, todayRecord, isClockedIn, isOnBreak, loading } = useSelector((state: RootState) => state.attendance);
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filterDates, setFilterDates] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');

  const isAdmin = user?.role === 'admin' || user?.role === 'hr' || user?.role === 'manager';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data
  const mockRecords: AttendanceRecord[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'John Doe',
      date: '2024-01-20',
      clockIn: '09:00',
      clockOut: '17:30',
      totalHours: 8.5,
      status: 'present',
    },
    {
      id: '2',
      employeeId: '1',
      employeeName: 'John Doe',
      date: '2024-01-19',
      clockIn: '09:15',
      clockOut: '17:45',
      totalHours: 8.5,
      status: 'late',
    },
    {
      id: '3',
      employeeId: '2',
      employeeName: 'Sarah Johnson',
      date: '2024-01-20',
      clockIn: '08:45',
      clockOut: '17:15',
      totalHours: 8.5,
      status: 'present',
    },
  ];

  const handleClockIn = () => {
    const currentTimeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dispatch(clockIn({
      employeeId: user?.id || '',
      time: currentTimeStr,
    }));
    message.success('Clocked in successfully');
  };

  const handleClockOut = () => {
    const currentTimeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dispatch(clockOut(currentTimeStr));
    message.success('Clocked out successfully');
  };

  const handleStartBreak = () => {
    const currentTimeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dispatch(startBreak(currentTimeStr));
    message.success('Break started');
  };

  const handleEndBreak = () => {
    const currentTimeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dispatch(endBreak(currentTimeStr));
    message.success('Break ended');
  };

  const columns: ColumnsType<AttendanceRecord> = [
    ...(isAdmin ? [{
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
    }] : []),
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Clock In',
      dataIndex: 'clockIn',
      key: 'clockIn',
      render: (time: string) => time || '-',
    },
    {
      title: 'Clock Out',
      dataIndex: 'clockOut',
      key: 'clockOut',
      render: (time: string) => time || '-',
    },
    {
      title: 'Total Hours',
      dataIndex: 'totalHours',
      key: 'totalHours',
      render: (hours: number) => hours ? `${hours}h` : '-',
    },
    {
      title: 'Overtime',
      dataIndex: 'overtime',
      key: 'overtime',
      render: (overtime: number) => overtime ? `${overtime}h` : '0h',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'present' ? 'green' :
          status === 'late' ? 'orange' :
          status === 'absent' ? 'red' :
          status === 'half-day' ? 'blue' : 'purple'
        }>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Present', value: 'present' },
        { text: 'Late', value: 'late' },
        { text: 'Absent', value: 'absent' },
        { text: 'Half Day', value: 'half-day' },
        { text: 'Holiday', value: 'holiday' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  // Filter records based on user role and filters
  const filteredRecords = isAdmin 
    ? mockRecords.filter(record => {
        if (selectedEmployee && record.employeeId !== selectedEmployee) return false;
        if (filterDates) {
          const recordDate = dayjs(record.date);
          return recordDate.isAfter(filterDates[0]) && recordDate.isBefore(filterDates[1]);
        }
        return true;
      })
    : mockRecords.filter(record => record.employeeId === user?.id);

  const stats = [
    {
      title: 'Present Days',
      value: filteredRecords.filter(r => r.status === 'present').length,
      color: '#52c41a',
    },
    {
      title: 'Late Arrivals',
      value: filteredRecords.filter(r => r.status === 'late').length,
      color: '#faad14',
    },
    {
      title: 'Absent Days',
      value: filteredRecords.filter(r => r.status === 'absent').length,
      color: '#ff4d4f',
    },
    {
      title: 'Average Hours',
      value: filteredRecords.reduce((acc, r) => acc + (r.totalHours || 0), 0) / filteredRecords.length || 0,
      color: '#1890ff',
      precision: 1,
      suffix: 'h',
    },
  ];

  const todayActivities = [
    ...(todayRecord?.clockIn ? [{
      color: 'green',
      children: `Clocked in at ${todayRecord.clockIn}`,
    }] : []),
    ...(todayRecord?.breakStart ? [{
      color: 'orange',
      children: `Break started at ${todayRecord.breakStart}`,
    }] : []),
    ...(todayRecord?.breakEnd ? [{
      color: 'blue',
      children: `Break ended at ${todayRecord.breakEnd}`,
    }] : []),
    ...(todayRecord?.clockOut ? [{
      color: 'red',
      children: `Clocked out at ${todayRecord.clockOut}`,
    }] : []),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={2} className="mb-0">Attendance</Title>
        <div className="text-right">
          <Text className="text-muted block">Current Time</Text>
          <Text className="text-2xl font-mono">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </div>
      </div>

      {/* Clock In/Out Section (Employee View) */}
      {user?.role === 'employee' && (
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="Quick Actions" className="hr-card">
              <div className="text-center space-y-4">
                <div className="text-6xl font-mono text-primary mb-4">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                <Space size="large">
                  {!isClockedIn ? (
                    <Button
                      type="primary"
                      size="large"
                      icon={<PlayCircleOutlined />}
                      onClick={handleClockIn}
                      className="hr-button-primary px-8 py-6 text-lg"
                    >
                      Clock In
                    </Button>
                  ) : (
                    <>
                      {!isOnBreak ? (
                        <Button
                          size="large"
                          icon={<PauseCircleOutlined />}
                          onClick={handleStartBreak}
                          className="px-6"
                        >
                          Start Break
                        </Button>
                      ) : (
                        <Button
                          size="large"
                          icon={<PlayCircleOutlined />}
                          onClick={handleEndBreak}
                          className="px-6"
                        >
                          End Break
                        </Button>
                      )}
                      
                      <Button
                        danger
                        size="large"
                        icon={<StopOutlined />}
                        onClick={handleClockOut}
                        className="px-8"
                      >
                        Clock Out
                      </Button>
                    </>
                  )}
                </Space>

                {isClockedIn && (
                  <div className="mt-6">
                    <Tag color={isOnBreak ? 'orange' : 'green'} className="text-lg px-4 py-2">
                      {isOnBreak ? 'ON BREAK' : 'WORKING'}
                    </Tag>
                  </div>
                )}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Today's Activity" className="hr-card h-full">
              {todayActivities.length > 0 ? (
                <Timeline items={todayActivities} />
              ) : (
                <div className="text-center text-muted py-8">
                  <ClockCircleOutlined className="text-4xl mb-4" />
                  <p>No activity recorded today</p>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      )}

      {/* Stats */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="hr-card">
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: stat.color }}
                precision={stat.precision}
                suffix={stat.suffix}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Monthly Overview (Employee View) */}
      {user?.role === 'employee' && (
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="This Month's Summary" className="hr-card">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Text>Attendance Rate</Text>
                  <Text strong>95.5%</Text>
                </div>
                <Progress percent={95.5} strokeColor="#52c41a" />
                
                <div className="flex justify-between items-center">
                  <Text>Average Daily Hours</Text>
                  <Text strong>8.5h</Text>
                </div>
                <Progress percent={85} strokeColor="#1890ff" />
                
                <div className="flex justify-between items-center">
                  <Text>On-time Arrivals</Text>
                  <Text strong>90%</Text>
                </div>
                <Progress percent={90} strokeColor="#faad14" />
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Leave Balance" className="hr-card">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <div className="text-center">
                    <Title level={3} className="text-primary mb-1">15</Title>
                    <Text className="text-muted">Vacation</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center">
                    <Title level={3} className="text-success mb-1">8</Title>
                    <Text className="text-muted">Sick</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center">
                    <Title level={3} className="text-warning mb-1">3</Title>
                    <Text className="text-muted">Personal</Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}

      {/* Filters (Admin View) */}
      {isAdmin && (
        <Card className="hr-card">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <RangePicker
              value={filterDates}
              onChange={(dates) => setFilterDates(dates)}
              placeholder={['Start Date', 'End Date']}
            />
            <Select
              placeholder="Select Employee"
              allowClear
              style={{ width: 200 }}
              value={selectedEmployee}
              onChange={setSelectedEmployee}
            >
              <Option value="1">John Doe</Option>
              <Option value="2">Sarah Johnson</Option>
              <Option value="3">Mike Chen</Option>
            </Select>
          </div>
        </Card>
      )}

      {/* Attendance Records */}
      <Card 
        title="Attendance Records" 
        className="hr-card"
        extra={
          <Space>
            <Button icon={<CalendarOutlined />}>Export</Button>
            <Button icon={<FilterOutlined />}>Filter</Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredRecords}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} records`,
          }}
          className="hr-table"
        />
      </Card>
    </div>
  );
};

export default AttendancePage;