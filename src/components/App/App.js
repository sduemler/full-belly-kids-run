import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ActivityList from '../Activities/index.js';
import Navigation from '../Navigation';
import * as ROUTES from '../Navigation/routes';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import { withAuthentication } from '../Session';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import { Divider } from 'semantic-ui-react';
import LandingPage from '../Landing';

const App = () => (
  <div className='App'>
    <header>
      <div className='wrapper' style={{ textAlign: 'center' }}>
        <h1>Full Belly 5K Kids</h1>
      </div>
    </header>
    <Router>
      <div>
        <Navigation />
        <Divider hidden />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.ACTIVITIES} component={ActivityList} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      </div>
    </Router>
  </div>
);

export default withAuthentication(App);
