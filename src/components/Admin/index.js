import React, { Component } from 'react';
import { Container, Segment, List, ListContent } from 'semantic-ui-react';

import { withFirebase } from '../Firebase';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', (snapshot) => {
      this.setState({
        users: snapshot.val() ?? [],
      });
    });

    console.log(this.state.users);
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <Container>
        <Segment placeholder>
          <List bulleted>
            {Object.keys(this.state.users).map((user) => (
              <List.Item>
                {this.state.users[user].username} -{' '}
                {this.state.users[user].email}
                {this.state.users[user].children !== undefined && (
                  <List.List>
                    {Object.keys(this.state.users[user].children).map(
                      (child) => (
                        <List.Item>
                          {this.state.users[user].children[child].name}
                          <List.List>
                            <List.Item>
                              School :{' '}
                              {this.state.users[user].children[child].school}
                            </List.Item>
                            <List.Item>
                              Grade :{' '}
                              {this.state.users[user].children[child].grade}
                            </List.Item>
                            {this.state.users[user].children[child]
                              .allActivitiesCompleted && (
                              <List.Item style={{ color: 'green' }}>
                                ALL ACTIVITIES COMPLETED
                              </List.Item>
                            )}
                          </List.List>
                        </List.Item>
                      )
                    )}
                  </List.List>
                )}
              </List.Item>
            ))}
          </List>
        </Segment>
      </Container>
    );
  }
}

export default withFirebase(AdminPage);
