import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import { store } from './store/store';
import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import Dashboard from './pages/dashboard/Dashboard';
import EmployeesPage from './pages/employees/EmployeesPage';
import EmployeeProfilePage from './pages/employees/EmployeeProfilePage';
import LeavePage from './pages/leave/LeavePage';
import AttendancePage from './pages/attendance/AttendancePage';
import PayrollPage from './pages/payroll/PayrollPage';
import RecruitmentPage from './pages/recruitment/RecruitmentPage';
import SettingsPage from './pages/settings/SettingsPage';
import './index.css';

// Ant Design theme configuration
const antTheme = {
  token: {
    colorPrimary: '#4096ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Layout: {
      siderBg: '#1e293b',
      triggerBg: '#1e293b',
      triggerColor: '#94a3b8',
    },
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: '#334155',
      darkItemHoverBg: '#475569',
    },
    Button: {
      borderRadius: 8,
    },
    Card: {
      borderRadius: 12,
    },
    Table: {
      borderRadius: 12,
      headerBg: '#f8fafc',
    },
  },
};

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antTheme}>
        <AntApp>
          <BrowserRouter>
            <div className="hr-container">
              <Routes>
                {/* Auth Routes */}
                <Route path="/auth" element={<AuthLayout />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="forgot-password" element={<ForgotPasswordPage />} />
                </Route>

                {/* Protected Main Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="employees" element={<EmployeesPage />} />
                  <Route path="employees/:id" element={<EmployeeProfilePage />} />
                  <Route path="leave" element={<LeavePage />} />
                  <Route path="attendance" element={<AttendancePage />} />
                  <Route path="payroll" element={<PayrollPage />} />
                  <Route path="recruitment" element={<RecruitmentPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-lg">Redirecting to login...</div>
                    <script dangerouslySetInnerHTML={{
                      __html: `setTimeout(() => window.location.href = '/auth/login', 1000)`
                    }} />
                  </div>
                } />
              </Routes>
            </div>
          </BrowserRouter>
        </AntApp>
      </ConfigProvider>
    </Provider>
  );
}

export default App;