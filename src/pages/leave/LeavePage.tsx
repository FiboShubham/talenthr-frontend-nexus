import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Typography,
  Row,
  Col,
  Statistic,
  Tag,
  Space,
  Calendar,
  Badge,
  Tabs,
  message,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { RootState } from '../../store/store';
import { LeaveRequest, setLeaveRequests, addLeaveRequest, updateLeaveRequest } from '../../store/slices/leaveSlice';
import dayjs, { Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const LeavePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { requests, loading } = useSelector((state: RootState) => state.leave);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [form] = Form.useForm();

  const isAdmin = user?.role === 'admin' || user?.role === 'hr' || user?.role === 'manager';

  useEffect(() => {
    // Mock data
    const mockRequests: LeaveRequest[] = [
      {
        id: '1',
        employeeId: '1',
        employeeName: 'John Doe',
        leaveType: 'vacation',
        startDate: '2024-02-15',
        endDate: '2024-02-19',
        days: 5,
        reason: 'Family vacation',
        status: 'pending',
        appliedDate: '2024-01-20',
      },
      {
        id: '2',
        employeeId: '2',
        employeeName: 'Sarah Johnson',
        leaveType: 'sick',
        startDate: '2024-02-10',
        endDate: '2024-02-11',
        days: 2,
        reason: 'Medical appointment',
        status: 'approved',
        appliedDate: '2024-02-08',
        approvedBy: 'HR Manager',
        approvedDate: '2024-02-09',
      },
    ];
    
    dispatch(setLeaveRequests(mockRequests));
  }, [dispatch]);

  const handleApplyLeave = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const [startDate, endDate] = values.dateRange;
      
      const days = endDate.diff(startDate, 'day') + 1;
      
      const newRequest: LeaveRequest = {
        id: Date.now().toString(),
        employeeId: user?.id || '',
        employeeName: user?.name || '',
        leaveType: values.leaveType,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        days,
        reason: values.reason,
        status: 'pending',
        appliedDate: dayjs().format('YYYY-MM-DD'),
      };

      dispatch(addLeaveRequest(newRequest));
      message.success('Leave request submitted successfully');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleApprove = (request: LeaveRequest) => {
    const updatedRequest = {
      ...request,
      status: 'approved' as const,
      approvedBy: user?.name || '',
      approvedDate: dayjs().format('YYYY-MM-DD'),
    };
    
    dispatch(updateLeaveRequest(updatedRequest));
    message.success('Leave request approved');
  };

  const handleReject = (request: LeaveRequest) => {
    const updatedRequest = {
      ...request,
      status: 'rejected' as const,
      approvedBy: user?.name || '',
      approvedDate: dayjs().format('YYYY-MM-DD'),
    };
    
    dispatch(updateLeaveRequest(updatedRequest));
    message.success('Leave request rejected');
  };

  const handleView = (request: LeaveRequest) => {
    setSelectedRequest(request);
    setViewModalVisible(true);
  };

  const columns: ColumnsType<LeaveRequest> = [
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
      render: (type) => (
        <Tag color={
          type === 'vacation' ? 'blue' :
          type === 'sick' ? 'red' :
          type === 'personal' ? 'orange' :
          type === 'emergency' ? 'purple' :
          type === 'maternity' ? 'pink' : 'green'
        }>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
      sorter: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: 'days',
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={
          status === 'approved' ? 'green' :
          status === 'rejected' ? 'red' : 'orange'
        }>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          {isAdmin && record.status === 'pending' && (
            <>
              <Popconfirm
                title="Approve this leave request?"
                onConfirm={() => handleApprove(record)}
                okText="Approve"
                cancelText="Cancel"
              >
                <Button
                  type="text"
                  icon={<CheckOutlined />}
                  className="text-success hover:bg-success-light"
                />
              </Popconfirm>
              <Popconfirm
                title="Reject this leave request?"
                onConfirm={() => handleReject(record)}
                okText="Reject"
                cancelText="Cancel"
              >
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  className="text-error hover:bg-error-light"
                />
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  const getListData = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    return requests.filter(request => {
      const start = dayjs(request.startDate);
      const end = dayjs(request.endDate);
      return value.isAfter(start.subtract(1, 'day')) && value.isBefore(end.add(1, 'day'));
    }).map(request => ({
      type: request.status === 'approved' ? 'success' : 
            request.status === 'rejected' ? 'error' : 'warning',
      content: `${request.employeeName} - ${request.leaveType}`,
    }));
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as any} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  // Filter requests based on user role
  const filteredRequests = isAdmin 
    ? requests 
    : requests.filter(req => req.employeeId === user?.id);

  const stats = [
    {
      title: 'Total Requests',
      value: filteredRequests.length,
      color: '#1890ff',
    },
    {
      title: 'Pending',
      value: filteredRequests.filter(req => req.status === 'pending').length,
      color: '#faad14',
    },
    {
      title: 'Approved',
      value: filteredRequests.filter(req => req.status === 'approved').length,
      color: '#52c41a',
    },
    {
      title: 'Rejected',
      value: filteredRequests.filter(req => req.status === 'rejected').length,
      color: '#ff4d4f',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={2} className="mb-0">Leave Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleApplyLeave}
          className="hr-button-primary"
        >
          Apply for Leave
        </Button>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="hr-card">
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Leave Balance (for employees) */}
      {user?.role === 'employee' && (
        <Card title="My Leave Balance" className="hr-card">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <div className="text-center">
                <Title level={3} className="text-primary mb-1">15</Title>
                <Text className="text-muted">Vacation Days</Text>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="text-center">
                <Title level={3} className="text-success mb-1">8</Title>
                <Text className="text-muted">Sick Days</Text>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="text-center">
                <Title level={3} className="text-warning mb-1">3</Title>
                <Text className="text-muted">Personal Days</Text>
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* Tabs */}
      <Card className="hr-card">
        <Tabs defaultActiveKey="requests">
          <TabPane tab="Leave Requests" key="requests">
            <Table
              columns={columns}
              dataSource={filteredRequests}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} requests`,
              }}
              className="hr-table"
            />
          </TabPane>

          <TabPane tab="Leave Calendar" key="calendar">
            <Calendar
              dateCellRender={dateCellRender}
              className="hr-calendar"
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Apply Leave Modal */}
      <Modal
        title="Apply for Leave"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        okText="Submit Request"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            label="Leave Type"
            name="leaveType"
            rules={[{ required: true, message: 'Please select leave type' }]}
          >
            <Select placeholder="Select leave type">
              <Option value="vacation">Vacation</Option>
              <Option value="sick">Sick Leave</Option>
              <Option value="personal">Personal Leave</Option>
              <Option value="emergency">Emergency Leave</Option>
              <Option value="maternity">Maternity Leave</Option>
              <Option value="paternity">Paternity Leave</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date Range"
            name="dateRange"
            rules={[{ required: true, message: 'Please select date range' }]}
          >
            <RangePicker 
              style={{ width: '100%' }}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: 'Please provide a reason' }]}
          >
            <TextArea
              rows={4}
              placeholder="Please provide a detailed reason for your leave request"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Leave Modal */}
      <Modal
        title="Leave Request Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedRequest && (
          <div className="space-y-4">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Employee:</Text>
                <br />
                <Text>{selectedRequest.employeeName}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Leave Type:</Text>
                <br />
                <Tag color={
                  selectedRequest.leaveType === 'vacation' ? 'blue' :
                  selectedRequest.leaveType === 'sick' ? 'red' : 'orange'
                }>
                  {selectedRequest.leaveType.toUpperCase()}
                </Tag>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Start Date:</Text>
                <br />
                <Text>{dayjs(selectedRequest.startDate).format('MMMM DD, YYYY')}</Text>
              </Col>
              <Col span={12}>
                <Text strong>End Date:</Text>
                <br />
                <Text>{dayjs(selectedRequest.endDate).format('MMMM DD, YYYY')}</Text>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Duration:</Text>
                <br />
                <Text>{selectedRequest.days} day(s)</Text>
              </Col>
              <Col span={12}>
                <Text strong>Status:</Text>
                <br />
                <Tag color={
                  selectedRequest.status === 'approved' ? 'green' :
                  selectedRequest.status === 'rejected' ? 'red' : 'orange'
                }>
                  {selectedRequest.status.toUpperCase()}
                </Tag>
              </Col>
            </Row>

            <div>
              <Text strong>Reason:</Text>
              <br />
              <Text>{selectedRequest.reason}</Text>
            </div>

            <div>
              <Text strong>Applied Date:</Text>
              <br />
              <Text>{dayjs(selectedRequest.appliedDate).format('MMMM DD, YYYY')}</Text>
            </div>

            {selectedRequest.approvedBy && (
              <div>
                <Text strong>Approved By:</Text>
                <br />
                <Text>{selectedRequest.approvedBy}</Text>
                <br />
                <Text className="text-muted text-sm">
                  on {dayjs(selectedRequest.approvedDate).format('MMMM DD, YYYY')}
                </Text>
              </div>
            )}

            {selectedRequest.comments && (
              <div>
                <Text strong>Comments:</Text>
                <br />
                <Text>{selectedRequest.comments}</Text>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LeavePage;