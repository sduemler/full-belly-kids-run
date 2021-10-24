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
    this.props.firebase.info().on('value', (snapshot) => {
      const actList = snapshot.val().Activities.slice(1);
      this.setState({
        activities: actList ?? [],
      });
    });
  }

  render() {
    return (
      <div>
        <Card.Group centered>
          {this.state.activities.map((activity) => (
            <ActivityCard key={activity} activityDesc={activity} />
          ))}
        </Card.Group>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(ActivityList));
