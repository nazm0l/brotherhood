import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAdmin = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role === 'Admin' ? children : <Navigate to="/dashboard" state={{ from: location }} />;
};

export default RequireAdmin;
