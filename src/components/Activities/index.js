import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import { Card, Modal, Button } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class ActivityList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      userActivities: [],
      tenActivitiesCompleted: false,
      allActivitiesCompleted: false,
    };
  }

  componentDidMount() {
    const user = this.props.firebase.auth.currentUser;
    this.props.firebase.activities().on('value', (snapshot) => {
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

  componentWillUnmount() {
    this.props.firebase.activities().off();
    this.props.firebase.user().off();
  }

  handleCompleteClick = (actKey) => {
    const user = this.props.firebase.auth.currentUser;
    let userActivityList = this.state.userActivities;
    if (!userActivityList.includes(actKey)) {
      userActivityList.push(actKey);
      this.props.firebase.updateActivity(userActivityList, user.uid);
    }
    if (userActivityList.length === 10) {
      this.setState({ tenActivitiesCompleted: true });
    }
    if (userActivityList.length === 16) {
      this.setState({ allActivitiesCompleted: true });
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

  handleClose = () => {
    this.setState({ tenActivitiesCompleted: false });
    this.setState({ allActivitiesCompleted: false });
  };

  render() {
    return (
      <div>
        <Modal open={this.state.tenActivitiesCompleted} size='mini'>
          <Modal.Header>Congratulations!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              You completed 10 activities and will receive a certificate of
              achievement!
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal open={this.state.allActivitiesCompleted} size='mini'>
          <Modal.Header>Congratulations!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              You’re a champion! You completed the Full Belly Youth Activity
              Challenge. Look for an email soon about how to register for the
              Full Belly Fun Run.
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>

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
