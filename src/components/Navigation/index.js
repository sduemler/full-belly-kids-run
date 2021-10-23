import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTERS from './routes';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTERS.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTERS.SIGN_UP}>Sign Up</Link>
      </li>
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

export default Navigation;
