import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import quality from '../../resources/images/quality.png';

class ActivityCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [
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
      ],
      activityUrl: '',
    };
  }

  componentDidMount() {
    this.props.firebase.getImageUrl(this.props.activityImage).then((url) => {
      this.setState({ activityUrl: url });
    });
  }

  componentWillUnmount() {
    this.props.firebase.getImageUrl.off();
  }

  render() {
    return (
      <Card
        color={
          this.state.colors[
            Math.floor(Math.random() * (this.state.colors.length - 1))
          ]
        }>
        <Image src={this.state.activityUrl} ui={false} size='tiny' />
        <Card.Content>
          {this.props.completed && (
            <Card.Header style={{ textAlign: 'center' }}>
              Activity Completed!
              <Image src={quality} size='mini' />
            </Card.Header>
          )}
          <Card.Description>
            <strong>{this.props.activityDesc}</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {!this.props.completed ? (
            <Button
              fluid
              positive
              onClick={() => this.props.handleComplete(this.props.activityKey)}>
              Complete Activity
            </Button>
          ) : (
            <Button
              fluid
              negative
              onClick={() => this.props.handleReset(this.props.activityKey)}>
              Reset Activity
            </Button>
          )}
        </Card.Content>
      </Card>
    );
  }
}

export default withFirebase(ActivityCard);
