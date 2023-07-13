import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAdmin = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role === 'Admin' ? children : <p>Access Limited</p>;
};

export default RequireAdmin;
