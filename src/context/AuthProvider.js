/* eslint-disable camelcase */

import { createContext, useEffect, useState } from 'react';

import jwt_decode from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      const authData = {
        userId: decoded?.user_id,
        role: decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        user: decoded?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: decoded?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      };
      return { ...authData, accessToken };
    }
    return null;
  });

  useEffect(() => {
    if (auth && auth.accessToken) {
      // Store the access token in local storage
      localStorage.setItem('accessToken', auth.accessToken);
    } else {
      // Clear the access token from local storage
      localStorage.removeItem('accessToken');
    }
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
