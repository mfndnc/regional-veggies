import { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const ProtectedRoute = (props) => {
  const location = useLocation();
  const { authObj } = useContext(AuthContext);

  return authObj && authObj.logged ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/',
        state: { from: location },
      }}
    />
  );
};

export default ProtectedRoute;
