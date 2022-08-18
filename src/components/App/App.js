import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ActivityList from '../Activities/index.js';
import Navigation from '../Navigation';
import * as ROUTES from '../../resources/constants/routes';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import { withAuthentication } from '../Session';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import { Divider } from 'semantic-ui-react';
import LandingPage from '../Landing';
import Footer from '../Navigation/Footer';
import AdminPage from '../Admin';

const App = () => (
  <div className='App'>
    <header>
      <div className='wrapper' style={{ textAlign: 'center' }}>
        <h1>Full Belly Youth Activity Challenge</h1>
      </div>
    </header>
    <div>
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
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    </div>
    <div>
      <Footer />
    </div>
  </div>
);

export default withAuthentication(App);
