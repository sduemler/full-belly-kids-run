import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../Navigation/routes';
import {
  Form,
  Button,
  Message,
  Container,
  Segment,
  Divider,
  Grid,
} from 'semantic-ui-react';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailandPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ACTIVITIES);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Container>
        <Segment placeholder>
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <Form.Input
                    label='Username'
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Email Address'
                    icon='user'
                    iconPosition='left'
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label='Password'
                    name='password'
                    value={password}
                    onChange={this.onChange}
                    type='password'
                    placeholder='Password'
                    icon='lock'
                    iconPosition='left'
                  />
                  <Form.Button
                    primary
                    disabled={isInvalid}
                    type='submit'
                    content='Login'
                  />
                  {error && (
                    <Message header='Sign In Error' content={error.message} />
                  )}
                </Form.Field>
                <Link to={ROUTES.PASSWORD_FORGET}>
                  <Button secondary content='Forgot Password?' />
                </Link>
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Link to={ROUTES.SIGN_UP}>
                <Button content='Sign Up' icon='signup' size='big' />
              </Link>
            </Grid.Column>
          </Grid>

          <Divider vertical>OR</Divider>
        </Segment>
      </Container>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
