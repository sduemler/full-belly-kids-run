import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../resources/constants/routes';
import * as ERRORS from '../../resources/constants/errors';

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
    this.props.firebase.auth.app.firebase
      .auth()
      .setPersistence(
        this.props.firebase.auth.app.firebase.auth.Auth.Persistence.SESSION
      )
      .then(() => {
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
      });
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
          <Grid relaxed='very' stackable>
            <Grid.Row>
              <Grid.Column>
                <Form onSubmit={this.onSubmit}>
                  <Form.Field>
                    <Form.Input
                      label='Email'
                      name='email'
                      value={email}
                      onChange={this.onChange}
                      type='text'
                      placeholder='Email Address'
                      icon='mail'
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
                  </Form.Field>
                  <Form.Field>
                    <Button
                      as={Link}
                      to={ROUTES.PASSWORD_FORGET}
                      secondary
                      content='Forgot Password?'
                    />
                  </Form.Field>
                  <Form.Field>
                    {error && (
                      <Message
                        color='red'
                        header='Sign In Error'
                        content={
                          ERRORS.errorMap[
                            error.message.split('(')[1].split(')')[0]
                          ]
                        }
                      />
                    )}
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>

            <Divider horizontal>OR</Divider>

            <Grid.Row>
              <Grid.Column verticalAlign='middle'>
                <Button
                  as={Link}
                  to={ROUTES.SIGN_UP}
                  content='Sign Up'
                  icon='signup'
                  size='big'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;

export { SignInForm };
