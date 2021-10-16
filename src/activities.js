import React, { Component } from 'react';

class Activities extends Component {
  constructor(props) {
    super(props)

    props.firebase.info().on('value', snapshot => {
      console.log(snapshot.val());
    })
  }

  render() {
    return (
      <div>Reached the Activities page!</div>
    )
  }

}

export default Activities;