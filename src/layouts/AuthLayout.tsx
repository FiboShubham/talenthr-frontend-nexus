import { Outlet } from 'react-router-dom';
import { Layout, Card } from 'antd';

const { Content } = Layout;

const AuthLayout = () => {
  return (
    <Layout className="min-h-screen bg-gradient-primary">
      <Content className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">TalentHR</h1>
            <p className="text-primary-light">Manage your workforce efficiently</p>
          </div>
          <Card className="hr-card shadow-lg">
            <Outlet />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;