import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import { Card } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class ActivityList extends Component {
  constructor(props) {
    super(props);

    this.state = { activities: [] };
  }

  componentDidMount() {
    this.props.firebase.activities().on('value', (snapshot) => {
      const actList = snapshot.val();
      this.setState({
        activities: actList ?? [],
      });
    });
  }

  render() {
    return (
      <div>
        <Card.Group centered>
          {Object.keys(this.state.activities).map((activity) => (
            <ActivityCard
              key={activity}
              activityDesc={this.state.activities[activity].name}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(ActivityList));
