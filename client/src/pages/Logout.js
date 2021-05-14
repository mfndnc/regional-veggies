import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import { useHistory } from 'react-router-dom';
import auth from '../api/auth';
export default function Logout() {
  const { authObj, setAuthObj } = useContext(AuthContext);
  let history = useHistory();
  useEffect(() => {
    if (!authObj.logged) history.push('/');
  }, [authObj, history]);

  auth.logout().finally(() => auth.loggedContext(setAuthObj));
  return <></>;
}
