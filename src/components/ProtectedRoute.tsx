import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'hr' | 'manager' | 'employee';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  console.log('ProtectedRoute render:', { isAuthenticated, user: user?.name, requiredRole });

  if (!isAuthenticated || !user) {
    console.log('Redirecting to login - not authenticated');
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    console.log('Redirecting to dashboard - insufficient role');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('ProtectedRoute allowing access');
  return <>{children}</>;
};

export default ProtectedRoute;