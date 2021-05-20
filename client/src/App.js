import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import EventsManStart from './pages/EventsManStart';
import EventsManage from './pages/EventsManage';
import EventsVwStart from './pages/EventsVwStart';
import EventsView from './pages/EventsView';
import BookMarkView from './pages/BookMarkView';
import ChatClient from './pages/ChatClient';
import ChatOwner from './pages/ChatOwner';
import ChatOwnerList from './pages/ChatOwnerList';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/auth';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './components/Chat.css';

function App() {
  const { authObj } = useContext(AuthContext);

  // important - since it takes that mili second for cookes to be detected - on page refresh it was redirecting to home
  let notReadyToStart = true;
  //console.log('notReadyToStart');
  if (authObj.logged === true || authObj.logged === false) {
    notReadyToStart = false;
    //console.log('can START');
  }

  /*if (authObj.loading === true) {
    //console.log('AUTH LOADING', authObj.error);
  } else if (authObj.logged === true) {
    //console.log('AUTH logged', authObj.error);
    notReadyToStart = false;
  } else if (authObj.logged === false) {
    //console.log('AUTH not logged', authObj.error);
    notReadyToStart = false;
  } else {
    //console.log('AUTH REST');
  }*/

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
        <ProtectedRoute exact path="/explore">
          <Explore />
        </ProtectedRoute>

        <ProtectedRoute exact path="/eventsview">
          <EventsVwStart />
        </ProtectedRoute>
        <ProtectedRoute exact path="/eventsview/:addressId">
          <EventsView />
        </ProtectedRoute>

        <ProtectedRoute exact path="/eventsmanage">
          <EventsManStart />
        </ProtectedRoute>
        <ProtectedRoute exact path="/eventsmanage/:addressId">
          <EventsManage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/eventsmanage/:addressId/allchats">
          <ChatOwnerList />
        </ProtectedRoute>
        <ProtectedRoute exact path="/eventsmanage/:addressId/:eventId">
          <ChatOwnerList />
        </ProtectedRoute>

        <ProtectedRoute exact path="/eventsmanage/:addressId/allchats/:chatId">
          <ChatOwner />
        </ProtectedRoute>
        <ProtectedRoute exact path="/eventsmanage/:addressId/:eventId/:chatId">
          <ChatOwner />
        </ProtectedRoute>

        <ProtectedRoute exact path="/bookmarkview">
          <BookMarkView />
        </ProtectedRoute>
        <ProtectedRoute exact path="/bookmarkview/:bookmarkId">
          <ChatClient />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
