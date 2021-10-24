import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from './routes';
import { AuthUserContext } from '../Session';
import { Menu, Button } from 'semantic-ui-react';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

class NavigationAuth extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'activities' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted stackable>
        <Menu.Item
          as={Link}
          to={ROUTES.ACTIVITIES}
          name='activities'
          active={activeItem === 'activities'}
          onClick={this.handleItemClick}>
          Activities
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={ROUTES.ACCOUNT}
          name='account'
          active={activeItem === 'account'}
          onClick={this.handleItemClick}>
          Account
        </Menu.Item>
        <Menu.Item position='right'>
          <SignOutButton />
        </Menu.Item>
      </Menu>
    );
  }
}

const NavigationNonAuth = () => (
  <Menu inverted stackable>
    <Menu.Item name='signin' position='right'>
      <Button as={Link} to={ROUTES.SIGN_IN} content='Sign In' />
    </Menu.Item>
  </Menu>
);

export default Navigation;
