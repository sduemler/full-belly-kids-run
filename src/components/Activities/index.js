import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import { Card } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class ActivityList extends Component {
  constructor(props) {
    super(props);

    this.state = { activities: [], userActivities: [] };
  }

  componentDidMount() {
    const user = this.props.firebase.auth.currentUser;
    this.props.firebase.activities().on('value', (snapshot) => {
      const actList = snapshot.val();
      this.setState({
        activities: actList ?? [],
      });
    });
    this.props.firebase.user(user.uid).on('value', (snapshot) => {
      this.setState({
        userActivities: snapshot.val().completedActivities ?? [],
      });
    });
  }

  handleCompleteClick = (actKey) => {
    const user = this.props.firebase.auth.currentUser;
    let userActivityList = this.state.userActivities;
    if (!userActivityList.includes(actKey)) {
      userActivityList.push(actKey);
      this.setState({
        userActivities: userActivityList,
      });
      this.props.firebase.updateActivity(this.state.userActivities, user.uid);
    }
  };

  render() {
    return (
      <div>
        <Card.Group centered>
          {Object.keys(this.state.activities).map((activity) => (
            <ActivityCard
              key={activity}
              activityDesc={this.state.activities[activity].name}
              activityKey={activity}
              completed={this.state.userActivities.includes(activity)}
              handleComplete={this.handleCompleteClick}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(ActivityList));
