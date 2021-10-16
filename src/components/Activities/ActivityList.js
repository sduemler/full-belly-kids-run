import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import { Card } from 'semantic-ui-react';

class ActivityList extends Component {
  constructor(props) {
    super(props)

    props.firebase.info().on('value', snapshot => {
      console.log(snapshot.val());
    })
  }

  render() {
    return (
      <div>
        <Card.Group itemsPerRow={3}>
          <ActivityCard activityTitle="Exercise" activityType="Running" activityDesc="Run/Walk 1 mile outside." />
          <ActivityCard activityTitle="Exercise" activityType="Running" activityDesc="Run/Walk 1 mile outside." />
          <ActivityCard activityTitle="Exercise" activityType="Running" activityDesc="Run/Walk 1 mile outside." />
          <ActivityCard activityTitle="Exercise" activityType="Running" activityDesc="Run/Walk 1 mile outside." />
          <ActivityCard activityTitle="Exercise" activityType="Running" activityDesc="Run/Walk 1 mile outside." />
          <ActivityCard activityTitle="Exercise" activityType="Running" activityDesc="Run/Walk 1 mile outside." />
        </Card.Group>
        {/* <div>Reached the Activities page!</div>
        <ActivityCard /> */}
      </div>
    )
  }

}

export default ActivityList;