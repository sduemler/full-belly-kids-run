import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import runningImage from '../../resources/images/running-outside.jpg';
// import quality from '../../resources/images/quality.png'

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
  return (
    <Card color={colors[Math.floor(Math.random() * (colors.length - 1))]}>
      <Image src={runningImage} wrapped ui={false} />
      <Card.Content>
        {/* <Card.Header>
          Task Completed!
          <Image src={quality} size='mini' />
        </Card.Header> */}
        <Card.Description>
          <strong>{props.activityDesc}</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button positive fluid>
          Complete Task
        </Button>
      </Card.Content>
    </Card>
  );
};

export default ActivityCard;
