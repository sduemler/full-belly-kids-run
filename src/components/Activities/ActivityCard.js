import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import runningImage from '../../resources/images/running-outside.jpg'

const ActivityCard = (props) => {
  return (
    <Card color='red'>
      <Image src={runningImage} wrapped ui={false} />
      <Card.Content>
        <Card.Header>Exercise</Card.Header>
        <Card.Meta>
          <span className='exerciseType'>Running</span>
        </Card.Meta>
        <Card.Description>
          Run/Walk 1 mile outside.
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default ActivityCard;