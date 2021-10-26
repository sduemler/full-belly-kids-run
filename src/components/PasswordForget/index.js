import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../resources/constants/routes';
import * as ERRORS from '../../resources/constants/errors';
import { Form, Message, Container, Segment, Header } from 'semantic-ui-react';

const PasswordForgetPage = () => (
  <div style={{ textAlign: 'center' }}>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
  submitted: false,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ email: '', error: null, submitted: true });
      })
      .catch((error) => {
        this.setState({ error, submitted: false });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error, submitted } = this.state;

    const isInvalid = email === '';

    return (
      <Container>
        <Segment placeholder>
          <Form onSubmit={this.onSubmit}>
            <Header as='h2'>Reset Password</Header>
            <Form.Input
              name='email'
              value={this.state.email}
              onChange={this.onChange}
              type='text'
              placeholder='Email Address'
              icon='mail'
              iconPosition='left'
            />
            <Form.Button disabled={isInvalid} type='submit'>
              Reset My Password
            </Form.Button>
            <Form.Field>
              {error && (
                <Message
                  color='red'
                  header='Reset Password Error'
                  content={
                    ERRORS.errorMap[error.message.split('(')[1].split(')')[0]]
                  }
                />
              )}
              {submitted && (
                <Message
                  color='green'
                  header='Password Reset Successfully'
                  content='Please check your email for a link to reset your password.'
                />
              )}
            </Form.Field>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
