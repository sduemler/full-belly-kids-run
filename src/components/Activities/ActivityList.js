import React, { Component } from 'react';
import ActivityCard from './ActivityCard';

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
        <div>Reached the Activities page!</div>
        <ActivityCard />
      </div>
    )
  }

}

export default ActivityList;