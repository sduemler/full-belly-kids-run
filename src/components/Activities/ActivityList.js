import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import { Card } from 'semantic-ui-react';

class ActivityList extends Component {
  constructor(props) {
    super(props)

    this.state = {activities: []}
  }

  componentDidMount() {
    this.props.firebase.info().on('value', snapshot => {
      const actList = snapshot.val().Activities.slice(1);
      this.setState({
        activities: actList ?? []}
      );
    })
  }
  
  render() {
    console.log(this.state)
    return (
      <div>
        <Card.Group itemsPerRow={3}>
          {this.state.activities.map((activity) => 
            <ActivityCard key={activity} activityTitle="Exercise" activityType="Running" activityDesc={activity} />
          )}
        </Card.Group>
      </div>
    )
  }

}

export default ActivityList;