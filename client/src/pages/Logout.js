import { useContext, useEffect } from 'react';
import { MyContextData } from '../context/auth';
import { useHistory } from 'react-router-dom';
import auth from '../api/auth';
export default function Logout() {
  const { myState, setMyState } = useContext(MyContextData);
  let history = useHistory();
  useEffect(() => {
    console.log('Login useEffect', myState);
  }, [myState]);

  auth.logout().then(() => {
    auth.loggedContext(setMyState);
    history.push('/');
  });
  return <></>;
}
