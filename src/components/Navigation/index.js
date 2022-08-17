import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../resources/constants/routes';
import { AuthUserContext } from '../Session';
import { Menu, Button } from 'semantic-ui-react';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? <NavigationFullAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

class NavigationAuth extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'activities', admin: false };
  }

  componentDidMount() {
    const user = this.props.firebase.auth.currentUser;
    this.props.firebase.user(user.uid).on('value', (snapshot) => {
      this.setState({
        admin: snapshot.val().role === 'admin' ?? false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user().off();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted stackable>
        <Menu.Menu position='right'>
          {this.state.admin && (
            <Menu.Item
              as={Link}
              to={ROUTES.ADMIN}
              name='admin'
              active={activeItem === 'admin'}
              onClick={this.handleItemClick}>
              Admin
            </Menu.Item>
          )}
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
          <Menu.Item
            as={Link}
            to={ROUTES.LANDING}
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}>
            Home
          </Menu.Item>
          <Menu.Item position='right'>
            <SignOutButton />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const NavigationNonAuth = () => (
  <Menu inverted stackable>
    <Menu.Menu position='right'>
      <Menu.Item as={Link} to={ROUTES.LANDING} name='home'>
        Home
      </Menu.Item>
      <Menu.Item name='signin' position='right'>
        <Button as={Link} to={ROUTES.SIGN_IN} content='Sign In' />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

const NavigationFullAuth = withFirebase(NavigationAuth);
export default Navigation;
