import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import { Card, Modal, Button, Segment, Divider } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import { Container } from 'semantic-ui-react';

class ActivityList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: [],
      childSelected: 0,
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
      this.setState({
        activities: actList ?? [],
      });
    });
    this.props.firebase.children(user.uid).on('value', (snapshot) => {
      this.setState({
        children: snapshot.val() ?? [],
      });
    });
    this.props.firebase
      .child(user.uid, this.state.childSelected)
      .on('value', (snapshot) => {
        this.setState({
          userActivities: snapshot.val().completedActivities ?? [],
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.activities().off();
    this.props.firebase.user().off();
    this.props.firebase.children().off();
    this.props.firebase.child().off();
  }

  handleChildSelect = (childIndex) => {
    this.setState({
      childSelected: childIndex,
      userActivities: this.state.children[childIndex].completedActivities ?? [],
    });
  };

  handleCompleteClick = (actKey) => {
    const user = this.props.firebase.auth.currentUser;
    let userActivityList = this.state.userActivities;
    if (!userActivityList.includes(actKey)) {
      userActivityList.push(actKey);
      this.props.firebase.updateActivity(
        userActivityList,
        user.uid,
        this.state.childSelected
      );
    }
    if (userActivityList.length === 10) {
      this.setState({ tenActivitiesCompleted: true });
      this.props.firebase.updateTenActivitiesCompleted(
        user.uid,
        this.state.childSelected
      );
    }
    if (userActivityList.length === 14) {
      this.setState({ allActivitiesCompleted: true });
      this.props.firebase.updateAllActivitiesCompleted(
        user.uid,
        this.state.childSelected
      );
    }
  };

  handleResetClick = (actKey) => {
    const user = this.props.firebase.auth.currentUser;
    let userActivityList = this.state.userActivities;
    if (userActivityList.includes(actKey)) {
      let filteredList = userActivityList.filter(function (value, index, arr) {
        return value !== actKey;
      });
      this.props.firebase.updateActivity(
        filteredList,
        user.uid,
        this.state.childSelected
      );
    }
  };

  handleClose = () => {
    this.setState({ tenActivitiesCompleted: false });
    this.setState({ allActivitiesCompleted: false });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          {Object.keys(this.state.children).map((child) => (
            <Button onClick={() => this.handleChildSelect(child)}>
              {this.state.children[child].name}
            </Button>
          ))}
        </div>

        <Divider></Divider>

        <Modal open={this.state.tenActivitiesCompleted} size='mini'>
          <Modal.Header>Congratulations!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              You completed 10 activities! You're so close, keep going!
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
              Challenge. Look for an email within a few days about how to
              register for the Full Belly Fun Run.
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
              activityImage={this.state.activities[activity].imageUrl}
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
