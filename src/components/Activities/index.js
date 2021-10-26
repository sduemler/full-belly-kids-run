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
    this.listener = this.props.firebase.activities().on('value', (snapshot) => {
      const actList = snapshot.val();
      // for (let key in actList) {
      //   this.props.firebase.getImageUrl(actList[key].imageUrl).then((url) => {
      //     actList[key].imageSrc = url;
      //   });
      // }
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

  //TODO complete the unmounting of the listener
  // componentWillUnmount() {
  //   this.listener.off();
  // }

  handleCompleteClick = (actKey) => {
    const user = this.props.firebase.auth.currentUser;
    let userActivityList = this.state.userActivities;
    if (!userActivityList.includes(actKey)) {
      userActivityList.push(actKey);
      this.props.firebase.updateActivity(userActivityList, user.uid);
    }
  };

  handleResetClick = (actKey) => {
    const user = this.props.firebase.auth.currentUser;
    let userActivityList = this.state.userActivities;
    if (userActivityList.includes(actKey)) {
      let filteredList = userActivityList.filter(function (value, index, arr) {
        return value !== actKey;
      });
      this.props.firebase.updateActivity(filteredList, user.uid);
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
              //activityImage={this.state.activities[activity].imageSrc}
              activityKey={activity}
              completed={this.state.userActivities.includes(activity)}
              handleComplete={this.handleCompleteClick}
              handleReset={this.handleResetClick}
            />
          ))}
        </Card.Group>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(ActivityList));
