import React from 'react';
import authentication from 'react-azure-b2c';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { auth } from './config/auth'

authentication.initialize(auth);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route path='/home' component={authentication.required(MainPage)} />
      </Switch>
    </Router>
  );
};

export default App;
