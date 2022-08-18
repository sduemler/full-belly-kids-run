import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import { AddChildForm } from '../ChildAdd';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div style={{ textAlign: ['center'] }}>
        <AddChildForm />
        <PasswordForgetForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
