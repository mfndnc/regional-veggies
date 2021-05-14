import { createContext, useEffect, useState } from 'react';
import auth from '../api/auth';

export const MyContextData = createContext(null);

export const MyContextProvider = (props) => {
  const [myState, setMyState] = useState({});
  useEffect(() => {
    auth.loggedContext(setMyState);
  }, []);

  return (
    <MyContextData.Provider value={{ myState, setMyState }}>
      {props.children}
    </MyContextData.Provider>
  );
};
