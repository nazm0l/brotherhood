import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  return user?.role === 'Admin';
};

export default useAdmin;
