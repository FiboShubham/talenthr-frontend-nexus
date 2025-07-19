import { Card, Form, Input, Button, Switch, Typography, Tabs } from 'antd';
import { SettingOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <Title level={2}>Settings</Title>
      <Card>
        <Tabs defaultActiveKey="profile">
          <TabPane tab="Profile" key="profile">
            <Form layout="vertical">
              <Form.Item label="Name">
                <Input placeholder="Your name" />
              </Form.Item>
              <Form.Item label="Email">
                <Input placeholder="Your email" />
              </Form.Item>
              <Button type="primary">Save Changes</Button>
            </Form>
          </TabPane>
          <TabPane tab="Notifications" key="notifications">
            <Form layout="vertical">
              <Form.Item label="Email Notifications">
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item label="Push Notifications">
                <Switch />
              </Form.Item>
              <Button type="primary">Save Preferences</Button>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default SettingsPage;