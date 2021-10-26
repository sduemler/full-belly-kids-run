import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../resources/constants/routes';
import { Form, Message, Container, Segment, Header } from 'semantic-ui-react';

const PasswordForgetPage = () => (
  <div style={{ textAlign: 'center' }}>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
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
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

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
                  content={error.message.slice(10).split('(')[0]}
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
