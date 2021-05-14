import { createContext, useEffect, useState } from 'react';
import auth from '../api/auth';

export const authContext = createContext(null);

export const authProvider = (props) => {
  const [authObj, setAuthObj] = useState({});
  useEffect(() => {
    auth.loggedContext(setAuthObj);
  }, []);

  return (
    <authContext.Provider value={{ authObj, setAuthObj }}>
      {props.children}
    </authContext.Provider>
  );
};
