import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  Button,
  Input,
  Select,
  Space,
  Avatar,
  Tag,
  Dropdown,
  Typography,
  Row,
  Col,
  Statistic,
  Modal,
  Form,
  DatePicker,
  Upload,
  message,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  UploadOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { RootState } from '../../store/store';
import { Employee, setEmployees, addEmployee } from '../../store/slices/employeeSlice';
import dayjs from 'dayjs';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

const EmployeesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { employees, loading } = useSelector((state: RootState) => state.employee);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Mock data - replace with API call
    const mockEmployees: Employee[] = [
      {
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
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      },
      {
        id: '2',
        employeeId: 'EMP002',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@company.com',
        phone: '+1 234 567 8901',
        department: 'Engineering',
        position: 'Engineering Manager',
        hireDate: '2021-03-20',
        status: 'active',
        salary: 110000,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=40&h=40&fit=crop&crop=face',
      },
      {
        id: '3',
        employeeId: 'EMP003',
        firstName: 'Mike',
        lastName: 'Chen',
        email: 'mike.chen@company.com',
        phone: '+1 234 567 8902',
        department: 'Sales',
        position: 'Sales Representative',
        manager: 'Emily Davis',
        hireDate: '2023-06-10',
        status: 'active',
        salary: 65000,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      },
    ];
    
    dispatch(setEmployees(mockEmployees));
  }, [dispatch]);

  const canEdit = user?.role === 'admin' || user?.role === 'hr';

  const handleAdd = () => {
    setEditingEmployee(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    form.setFieldsValue({
      ...employee,
      hireDate: dayjs(employee.hireDate),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Employee',
      content: 'Are you sure you want to delete this employee?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        // Handle delete
        message.success('Employee deleted successfully');
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const employeeData = {
        ...values,
        id: editingEmployee?.id || Date.now().toString(),
        employeeId: editingEmployee?.employeeId || `EMP${String(employees.length + 1).padStart(3, '0')}`,
        hireDate: values.hireDate.format('YYYY-MM-DD'),
        status: 'active' as const,
      };

      if (editingEmployee) {
        // Update employee
        message.success('Employee updated successfully');
      } else {
        dispatch(addEmployee(employeeData));
        message.success('Employee added successfully');
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const actionMenu = (employee: Employee) => ({
    items: [
      {
        key: 'view',
        icon: <EyeOutlined />,
        label: 'View Profile',
        onClick: () => navigate(`/employees/${employee.id}`),
      },
      ...(canEdit ? [
        {
          key: 'edit',
          icon: <EditOutlined />,
          label: 'Edit',
          onClick: () => handleEdit(employee),
        },
        {
          key: 'delete',
          icon: <DeleteOutlined />,
          label: 'Delete',
          onClick: () => handleDelete(employee.id),
          danger: true,
        },
      ] : []),
    ],
  });

  const columns: ColumnsType<Employee> = [
    {
      title: 'Employee',
      key: 'employee',
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div className="font-medium">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-muted text-sm">{record.employeeId}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div>{record.email}</div>
          <div className="text-muted text-sm">{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: [
        { text: 'Engineering', value: 'Engineering' },
        { text: 'Sales', value: 'Sales' },
        { text: 'Marketing', value: 'Marketing' },
        { text: 'HR', value: 'HR' },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={
          record.status === 'active' ? 'green' :
          record.status === 'inactive' ? 'orange' : 'red'
        }>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
      sorter: (a, b) => dayjs(a.hireDate).unix() - dayjs(b.hireDate).unix(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_, record) => (
        <Dropdown menu={actionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: <TeamOutlined className="text-primary" />,
    },
    {
      title: 'Active',
      value: employees.filter(emp => emp.status === 'active').length,
      icon: <UserOutlined className="text-success" />,
    },
    {
      title: 'New Hires (This Month)',
      value: employees.filter(emp => dayjs(emp.hireDate).month() === dayjs().month()).length,
      icon: <UserAddOutlined className="text-info" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={2} className="mb-0">Employees</Title>
        {canEdit && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
            className="hr-button-primary"
          >
            Add Employee
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
            <Card className="hr-card">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filters */}
      <Card className="hr-card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Search
            placeholder="Search employees..."
            allowClear
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Select
            placeholder="Department"
            allowClear
            style={{ width: 200 }}
          >
            <Option value="Engineering">Engineering</Option>
            <Option value="Sales">Sales</Option>
            <Option value="Marketing">Marketing</Option>
            <Option value="HR">HR</Option>
          </Select>
          <Select
            placeholder="Status"
            allowClear
            style={{ width: 150 }}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="terminated">Terminated</Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={employees}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} employees`,
          }}
          className="hr-table"
        />
      </Card>

      {/* Add/Edit Employee Modal */}
      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        okText={editingEmployee ? 'Update' : 'Add'}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: 'Please select department' }]}
              >
                <Select placeholder="Select department">
                  <Option value="Engineering">Engineering</Option>
                  <Option value="Sales">Sales</Option>
                  <Option value="Marketing">Marketing</Option>
                  <Option value="HR">HR</Option>
                  <Option value="Finance">Finance</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Position"
                name="position"
                rules={[{ required: true, message: 'Please enter position' }]}
              >
                <Input placeholder="Enter position" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Manager"
                name="manager"
              >
                <Select placeholder="Select manager" allowClear>
                  <Option value="Sarah Johnson">Sarah Johnson</Option>
                  <Option value="Mike Chen">Mike Chen</Option>
                  <Option value="Emily Davis">Emily Davis</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Hire Date"
                name="hireDate"
                rules={[{ required: true, message: 'Please select hire date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          {canEdit && (
            <Form.Item
              label="Salary"
              name="salary"
            >
              <Input
                type="number"
                placeholder="Enter annual salary"
                addonBefore="$"
              />
            </Form.Item>
          )}

          <Form.Item
            label="Profile Picture"
            name="avatar"
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeesPage;