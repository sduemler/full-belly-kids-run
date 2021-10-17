import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import { Card } from 'semantic-ui-react';

class ActivityList extends Component {
  constructor(props) {
    super(props)

    this.state = {activites: []}

    props.firebase.info().on('value', snapshot => {
      const actList = snapshot.val().Activities;
      this.state = {activities: actList.slice(1).map((activity) =>
          <ActivityCard key={actList.indexOf(activity)} activityTitle="Exercise" activityType="Running" activityDesc={activity} />
        )
      };
      console.log(this.state)
    })
  }
  
  render() {
    return (
      <div>
        <Card.Group itemsPerRow={3}>
          {this.state.activities}
        </Card.Group>
      </div>
    )
  }

}

export default ActivityList;