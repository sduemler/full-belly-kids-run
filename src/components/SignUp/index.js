import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../resources/constants/routes';
import * as ERRORS from '../../resources/constants/errors';

import { Form, Message, Container, Segment } from 'semantic-ui-react';

const SignUpPage = () => (
  <div>
    <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: 'user',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, role, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email, role });
      })
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggle = () =>
    this.setState((prevState) => ({ legalCheck: !prevState.legalCheck }));

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Container>
        <Segment placeholder>
          <Form onSubmit={this.onSubmit}>
            <Form.Input
              label='Username'
              name='username'
              value={username}
              onChange={this.onChange}
              type='text'
              placeholder='Full Name'
              icon='user'
              iconPosition='left'
            />
            <Form.Input
              label='Email Address'
              name='email'
              value={email}
              onChange={this.onChange}
              type='text'
              placeholder='Email Address'
              icon='mail'
              iconPosition='left'
            />
            <Form.Input
              label='Password'
              name='passwordOne'
              value={passwordOne}
              onChange={this.onChange}
              type='password'
              placeholder='Password'
              icon='lock'
              iconPosition='left'
            />
            <Form.Input
              label='Confirm Password'
              name='passwordTwo'
              value={passwordTwo}
              onChange={this.onChange}
              type='password'
              placeholder='Confirm Password'
              icon='lock'
              iconPosition='left'
            />
            <Form.Button
              primary
              disabled={isInvalid}
              type='submit'
              content='Sign Up'
            />
            <Form.Field>
              {error && (
                <Message
                  color='red'
                  header='Sign Up Error'
                  content={
                    ERRORS.errorMap[error.message.split('(')[1].split(')')[0]]
                  }
                />
              )}
            </Form.Field>
            <Container fluid text text-textAlign='center'>
              <p style={{ textAlign: 'center' }}>
                <strong>
                  After signing up, you will be redirected to a page where you
                  can add a child to your account.
                </strong>
              </p>
            </Container>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account yet? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
