import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../resources/constants/routes';
import * as ERRORS from '../../resources/constants/errors';

import { Form, Message, Container, Segment, Checkbox } from 'semantic-ui-react';

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
  legalCheck: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email });
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
    const { username, email, passwordOne, passwordTwo, legalCheck, error } =
      this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      legalCheck === false;

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
            <Form.Field>
              <Checkbox
                label='I have permission from my parent/legal guardian to participate.'
                checked={legalCheck}
                onChange={this.toggle}
              />
            </Form.Field>
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
