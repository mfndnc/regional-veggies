import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MyContextProvider } from './context/auth';

import { NavBar } from './components/';
import { HomePage } from './pages/';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <MyContextProvider>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </MyContextProvider>
    </BrowserRouter>
  );
}

export default App;
