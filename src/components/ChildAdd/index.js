import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

import * as ERRORS from '../../resources/constants/errors';
import { Form, Message, Container, Segment, Header } from 'semantic-ui-react';

const AddChildPage = () => (
  <div style={{ textAlign: 'center' }}>
    <AddChildForm />
  </div>
);

const INITIAL_STATE = {
  children: [],
  name: '',
  school: '',
  grade: '',
  error: null,
  submitted: false,
};

class AddChildFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const user = this.props.firebase.auth.currentUser;
    this.props.firebase.user(user.uid).on('value', (snapshot) => {
      this.setState({
        children: snapshot.val().children ?? [],
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user().off();
  }

  onSubmit = (event) => {
    const user = this.props.firebase.auth.currentUser;
    const { name, school, grade } = this.state;
    let childList = this.state.children;
    childList.push({
      name: name,
      school: school,
      grade: grade,
    });
    this.props.firebase.addChild(childList, user.uid).then(() => {
      this.setState({
        name: '',
        school: '',
        grade: '',
        submitted: true,
        error: null,
      }).catch((error) => {
        this.setState({ error, submitted: false });
      });
    });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, school, grade, error, submitted } = this.state;

    const isInvalid = name === '' || school === '' || grade === '';

    return (
      <Container>
        <Segment placeholder>
          <Form onSubmit={this.onSubmit}>
            <Header as='h2'>Add Child to Account</Header>
            <Form.Input
              name='name'
              value={this.state.name}
              onChange={this.onChange}
              type='text'
              placeholder='Full Name'
              icon='user'
              iconPosition='left'
            />
            <Form.Input
              label='School'
              name='school'
              value={this.state.school}
              onChange={this.onChange}
              type='text'
              placeholder='School'
              icon='building'
              iconPosition='left'
            />
            <Form.Input
              label='Grade'
              name='grade'
              value={this.state.grade}
              onChange={this.onChange}
              type='number'
              placeholder='Grade'
              icon='pencil alternate'
              iconPosition='left'
            />
            <Form.Button disabled={isInvalid} type='submit'>
              Add Child
            </Form.Button>
            <Form.Field>
              {error && (
                <Message
                  color='red'
                  header='Child Add Error'
                  content={
                    ERRORS.errorMap[error.message.split('(')[1].split(')')[0]]
                  }
                />
              )}
              {submitted && (
                <Message color='green' header='Child Added Successfully' />
              )}
            </Form.Field>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(AddChildPage));

const AddChildForm = withFirebase(AddChildFormBase);

export { AddChildForm };
