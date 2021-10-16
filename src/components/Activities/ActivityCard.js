import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import runningImage from '../../resources/images/running-outside.jpg'

const ActivityCard = (props) => {
  return (
    <Card color='red'>
      <Image src={runningImage} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.activityTitle}</Card.Header>
        <Card.Meta>
          <span className='exerciseType'>{props.activityType}</span>
        </Card.Meta>
        <Card.Description>
          {props.activityDesc}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default ActivityCard;