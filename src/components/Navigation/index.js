import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTERS from './routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTERS.ACTIVITIES}>Activities</Link>
      </li>
      <li>
        <Link to={ROUTERS.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTERS.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTERS.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
