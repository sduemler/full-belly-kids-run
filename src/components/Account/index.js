import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div style={{ textAlign: ['center'] }}>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
