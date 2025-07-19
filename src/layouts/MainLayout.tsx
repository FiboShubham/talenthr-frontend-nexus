import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Layout, 
  Menu, 
  Avatar, 
  Dropdown, 
  Badge, 
  Button, 
  Space,
  Typography,
  Divider
} from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  UserAddOutlined,
  SettingOutlined,
  BellOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/employees',
      icon: <TeamOutlined />,
      label: 'Employees',
    },
    {
      key: '/leave',
      icon: <CalendarOutlined />,
      label: 'Leave Management',
    },
    {
      key: '/attendance',
      icon: <ClockCircleOutlined />,
      label: 'Attendance',
    },
    ...(user?.role === 'admin' || user?.role === 'hr' ? [
      {
        key: '/payroll',
        icon: <DollarOutlined />,
        label: 'Payroll',
      },
      {
        key: '/recruitment',
        icon: <UserAddOutlined />,
        label: 'Recruitment',
      },
    ] : []),
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  const userMenu = (
    <Menu
      items={[
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: 'My Profile',
          onClick: () => navigate(`/employees/${user?.employeeId || user?.id}`),
        },
        {
          key: 'edit-profile',
          icon: <EditOutlined />,
          label: 'Edit Profile',
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout',
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="hr-sidebar shadow-lg"
        width={250}
        collapsedWidth={80}
      >
        <div className="p-4 text-center border-b border-sidebar-item">
          <h2 className={`text-sidebar-text font-bold transition-all duration-300 ${collapsed ? 'text-lg' : 'text-xl'}`}>
            {collapsed ? 'TH' : 'TalentHR'}
          </h2>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
          className="border-none"
        />
        
        {!collapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="hr-card p-3 bg-sidebar-item">
              <div className="flex items-center space-x-3">
                <Avatar src={user?.avatar} icon={<UserOutlined />} />
                <div className="flex-1 min-w-0">
                  <Text className="text-sidebar-text font-medium block truncate">
                    {user?.name}
                  </Text>
                  <Text className="text-sidebar-text-muted text-sm block truncate">
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </Sider>

      <Layout>
        <Header className="bg-card shadow-sm px-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-foreground hover:bg-surface"
            />
            <div>
              <Text className="text-lg font-semibold text-foreground">
                {menuItems.find(item => item.key === location.pathname)?.label || 'Dashboard'}
              </Text>
            </div>
          </div>

          <Space size="large">
            <Badge count={5} size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="text-foreground hover:bg-surface"
              />
            </Badge>
            
            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-surface px-2 py-1 rounded-lg transition-colors">
                <Avatar src={user?.avatar} icon={<UserOutlined />} />
                <div className="hidden md:block">
                  <Text className="text-foreground font-medium block">
                    {user?.name}
                  </Text>
                  <Text className="text-muted text-xs">
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </Text>
                </div>
              </div>
            </Dropdown>
          </Space>
        </Header>

        <Content className="p-6 bg-surface overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;