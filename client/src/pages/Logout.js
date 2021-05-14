import { useContext, useEffect } from 'react';
import { MyContextData } from '../context/auth';
import { useHistory } from 'react-router-dom';
import auth from '../api/auth';
export default function Logout() {
  const { myState, setMyState } = useContext(MyContextData);
  let history = useHistory();
  useEffect(() => {
    if (!myState.logged) history.push('/');
  }, [myState, history]);

  auth.logout().finally(() => auth.loggedContext(setMyState));
  return <></>;
}
