import { createContext, useEffect, useState } from 'react';
import auth from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [authObj, setAuthObj] = useState({});
  useEffect(() => {
    auth.loggedContext(setAuthObj);
  }, []);

  return (
    <AuthContext.Provider value={{ authObj, setAuthObj }}>
      {props.children}
    </AuthContext.Provider>
  );
};
