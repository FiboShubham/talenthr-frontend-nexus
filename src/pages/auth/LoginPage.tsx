import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Alert, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { loginSuccess } from '../../store/slices/authSlice';

const { Title, Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    setError(null);

    try {
      // Mock authentication - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data based on email
      const mockUsers = {
        'admin@talenthr.com': {
          id: '1',
          email: 'admin@talenthr.com',
          name: 'John Admin',
          role: 'admin' as const,
          companyId: 'comp1',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        },
        'hr@talenthr.com': {
          id: '2',
          email: 'hr@talenthr.com',
          name: 'Sarah HR',
          role: 'hr' as const,
          companyId: 'comp1',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face',
        },
        'employee@talenthr.com': {
          id: '3',
          email: 'employee@talenthr.com',
          name: 'Mike Employee',
          role: 'employee' as const,
          companyId: 'comp1',
          employeeId: 'EMP001',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        },
      };

      const user = mockUsers[values.email as keyof typeof mockUsers];
      
      if (!user || values.password !== 'password123') {
        throw new Error('Invalid email or password');
      }

      dispatch(loginSuccess(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Title level={3} className="text-foreground mb-2">Welcome Back</Title>
        <Text className="text-muted">Sign in to your TalentHR account</Text>
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
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        size="large"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Enter your email"
            className="hr-input"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
            iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            className="hr-input"
          />
        </Form.Item>

        <Form.Item>
          <div className="flex items-center justify-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-muted">Remember me</Checkbox>
            </Form.Item>
            <Link 
              to="/auth/forgot-password" 
              className="text-primary hover:text-primary-dark text-sm"
            >
              Forgot password?
            </Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="w-full hr-button-primary h-12 text-base font-medium"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center">
        <Text className="text-muted">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-primary hover:text-primary-dark font-medium">
            Sign up
          </Link>
        </Text>
      </div>

      {/* Demo Credentials */}
      <div className="hr-card bg-surface p-4 rounded-lg">
        <Text className="text-muted block text-sm mb-2">Demo Credentials:</Text>
        <Space direction="vertical" size="small" className="w-full">
          <div className="flex justify-between">
            <Text className="text-xs">Admin:</Text>
            <Text className="text-xs font-mono">admin@talenthr.com</Text>
          </div>
          <div className="flex justify-between">
            <Text className="text-xs">HR:</Text>
            <Text className="text-xs font-mono">hr@talenthr.com</Text>
          </div>
          <div className="flex justify-between">
            <Text className="text-xs">Employee:</Text>
            <Text className="text-xs font-mono">employee@talenthr.com</Text>
          </div>
          <div className="flex justify-between">
            <Text className="text-xs">Password:</Text>
            <Text className="text-xs font-mono">password123</Text>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default LoginPage;