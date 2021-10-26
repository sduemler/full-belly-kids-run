import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import runningImage from '../../resources/images/running-outside.jpg';
import quality from '../../resources/images/quality.png';

const ActivityCard = (props) => {
  const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
  ];

  const completed = props.completed;

  return (
    <Card color={colors[Math.floor(Math.random() * (colors.length - 1))]}>
      <Image src={runningImage} ui={false} size='tiny' />
      <Card.Content>
        {props.completed && (
          <Card.Header style={{ textAlign: 'center' }}>
            Activity Completed!
            <Image src={quality} size='mini' />
          </Card.Header>
        )}
        <Card.Description>
          <strong>{props.activityDesc}</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {!completed ? (
          <Button
            fluid
            positive
            onClick={() => props.handleComplete(props.activityKey)}>
            Complete Activity
          </Button>
        ) : (
          <Button
            fluid
            negative
            onClick={() => props.handleReset(props.activityKey)}>
            Reset Activity
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default withFirebase(ActivityCard);
