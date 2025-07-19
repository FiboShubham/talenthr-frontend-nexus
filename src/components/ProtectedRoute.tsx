import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'hr' | 'manager' | 'employee';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    console.log('ProtectedRoute useEffect:', { isAuthenticated, user: user?.name, requiredRole });
    
    if (!isAuthenticated || !user) {
      console.log('Setting redirect to login - not authenticated');
      setShouldRedirect(true);
      // Use window.location for initial redirect to avoid Router context issues
      window.location.href = '/auth/login';
      return;
    }

    if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
      console.log('Setting redirect to dashboard - insufficient role');
      setShouldRedirect(true);
      window.location.href = '/dashboard';
      return;
    }

    console.log('ProtectedRoute access granted');
    setShouldRedirect(false);
  }, [isAuthenticated, user, requiredRole]);

  // Show loading while checking authentication
  if (shouldRedirect) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Redirecting...</div>
    </div>;
  }

  if (!isAuthenticated || !user) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Checking authentication...</div>
    </div>;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Checking permissions...</div>
    </div>;
  }

  console.log('ProtectedRoute rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;