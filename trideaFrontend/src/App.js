import React from 'react';
import authentication from 'react-azure-b2c';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';

authentication.initialize({
  instance: 'https://login.microsoftonline.com/tfp/',
  tenant: 'dilemmatenanttest01.onmicrosoft.com',
  signInPolicy: 'B2C_1_react_signup',
  clientId: 'b514e478-893a-4156-9795-af608e58c91b',
  cacheLocation: 'sessionStorage',
  scopes: ['https://dilemmatenanttest01.onmicrosoft.com/api2/user_impersonation'],
  redirectUri: 'http://localhost:3000',
  postLogoutRedirectUri: window.location.origin,
});

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
