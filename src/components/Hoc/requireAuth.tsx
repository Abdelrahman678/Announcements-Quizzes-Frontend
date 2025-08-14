import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/* interface for require auth component */
interface RequireAuthProps {
  children: React.ReactNode;
}

/* require auth component */
export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};
