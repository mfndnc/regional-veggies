import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AddressForm from './components/AddressForm';
import ProfileForm from './components/ProfileForm';
import EventForm from './components/EventForm';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/auth';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { authObj } = useContext(AuthContext);

  // important for the refresh, since it takes that mili second for cookes to be detected
  let notReadyToStart = true;

  if (authObj.loading === true) {
    console.log('AUTH LOADING', authObj.error);
  } else if (authObj.logged === true) {
    console.log('AUTH logged', authObj.error);
    notReadyToStart = false;
  } else if (authObj.logged === false) {
    console.log('AUTH not logged', authObj.error);
    notReadyToStart = false;
  } else {
    console.log('AUTH REST');
  }

  if (notReadyToStart) return <div>...loading</div>;

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <ProtectedRoute exact path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/test1">
          <ProfileForm />
        </ProtectedRoute>
        <ProtectedRoute path="/test2" component={AddressForm} />

        <ProtectedRoute exact path="/test2/:addressId">
          <AddressForm />
        </ProtectedRoute>
        <ProtectedRoute exact path="/test2/:addressId/event">
          <EventForm />
        </ProtectedRoute>
        <ProtectedRoute exact path="/test3/:eventId">
          <EventForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
