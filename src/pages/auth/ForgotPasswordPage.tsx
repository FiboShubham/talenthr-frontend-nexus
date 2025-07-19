import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Alert, Typography, Result } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ForgotPasswordForm {
  email: string;
}

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const onFinish = async (values: ForgotPasswordForm) => {
    setLoading(true);
    setError(null);

    try {
      // Mock forgot password - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Password reset email sent to:', values.email);
      setEmailSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Result
        status="success"
        title="Check Your Email"
        subTitle="We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password."
        extra={[
          <Button type="primary" key="back" className="hr-button-primary">
            <Link to="/auth/login">
              <ArrowLeftOutlined /> Back to Login
            </Link>
          </Button>
        ]}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Title level={3} className="text-foreground mb-2">Forgot Password?</Title>
        <Text className="text-muted">
          Enter your email address and we'll send you a link to reset your password.
        </Text>
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
        name="forgot-password"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        size="large"
      >
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

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="w-full hr-button-primary h-12 text-base font-medium"
          >
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center">
        <Link 
          to="/auth/login" 
          className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
        >
          <ArrowLeftOutlined className="mr-2" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;