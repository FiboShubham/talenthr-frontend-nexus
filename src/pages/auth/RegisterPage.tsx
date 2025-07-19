import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Typography, Select } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, BankOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface RegisterForm {
  companyName: string;
  adminName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companySize: string;
  industry: string;
}

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterForm) => {
    setLoading(true);
    setError(null);

    try {
      // Mock registration - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate successful registration
      console.log('Registration successful:', values);
      navigate('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const companySize = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '500+', label: '500+ employees' },
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting',
    'Other',
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Title level={3} className="text-foreground mb-2">Create Account</Title>
        <Text className="text-muted">Get started with TalentHR today</Text>
      </div>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
        />
      )}

      <Form
        name="register"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: 'Please enter your company name!' }]}
        >
          <Input 
            prefix={<BankOutlined />} 
            placeholder="Enter company name"
            className="hr-input"
          />
        </Form.Item>

        <Form.Item
          label="Admin Name"
          name="adminName"
          rules={[{ required: true, message: 'Please enter your full name!' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Enter your full name"
            className="hr-input"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Enter your email"
            className="hr-input"
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Company Size"
            name="companySize"
            rules={[{ required: true, message: 'Please select company size!' }]}
          >
            <Select placeholder="Select company size">
              {companySize.map(size => (
                <Option key={size.value} value={size.value}>
                  {size.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Industry"
            name="industry"
            rules={[{ required: true, message: 'Please select industry!' }]}
          >
            <Select placeholder="Select industry">
              {industries.map(industry => (
                <Option key={industry} value={industry}>
                  {industry}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your password!' },
            { min: 8, message: 'Password must be at least 8 characters!' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Create password"
            iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            className="hr-input"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm password"
            iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            className="hr-input"
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="w-full hr-button-primary h-12 text-base font-medium"
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center">
        <Text className="text-muted">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-primary hover:text-primary-dark font-medium">
            Sign in
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default RegisterPage;