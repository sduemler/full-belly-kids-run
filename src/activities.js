import React from 'react';
import { FirebaseContext } from './components/Firebase'

const Activities = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return <div>I have access to Firebase!</div>
    }}
  </FirebaseContext.Consumer>
)

export default Activities;