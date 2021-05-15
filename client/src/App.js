import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import AddressForm from './components/AddressForm';
import ProfileForm from './components/ProfileForm';
import EventForm from './components/EventForm';

import ProtectedRoute from './components/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
