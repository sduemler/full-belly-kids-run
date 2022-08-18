import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Header, Button, List } from 'semantic-ui-react';
import * as ROUTES from '../../resources/constants/routes';
import { AuthUserContext } from '../Session';

const Landing = () => {
  return (
    <div>
      <Container>
        <Segment>
          <Container text>
            <Header as='h2' textAlign='center'>
              Full Belly Youth Activity Challenge
            </Header>
            <p>
              On Saturday, November 26 Friends of Shelby invites all kids 12
              years old and under to join us for the Full Belly Fun Run - a
              1-mile run, walk, or jog around beautiful Lake Sevier in Shelby
              Park.
            </p>
            <p>
              Race Signup Link:{' '}
              <a href='https://runsignup.com/Race/TN/Nashville/FullBellyFriendsofShelby5KandFunRun'>
                Full Belly Friends of Shelby Fun Run
              </a>
            </p>
            <p>
              Friends of Shelby wants to encourage kids to get on their feet,
              get outdoors, and get healthy. Thanks to support from{' '}
              <a href='https://www.academy.com/'>Academy Sports + Outdoors</a>,
              we have created the Youth Activity Challenge, with 14 fun ways to
              get kids moving.
            </p>
            <p>
              Register for free and log every activity you complete up until the
              Wednesday before Thanksgiving – November 23. Complete all 14
              activities and get a{' '}
              <strong>
                <u>free</u>
              </strong>{' '}
              Full Belly Fun Run registration including a race shirt.
            </p>
            <p>
              It’s easy as:
              <List ordered>
                <List.Item>
                  Register for the Youth Activity Challenge by creating a
                  username and password. Add your children to your account, then
                  click “Activities” at the top of the page to see the goals.
                </List.Item>
                <List.Item>
                  Log every activity your child completes on this website.
                </List.Item>
                <List.Item>
                  When your child has completed all 14 activities you will be
                  emailed a code to register for the Full Belly Fun Run!
                </List.Item>
              </List>
            </p>
            <p style={{ textAlign: 'center' }}>
              Note - If you created an account last year, you will need to
              recreate it this year.
            </p>
            <p style={{ textAlign: 'center' }}>
              <strong>Ready, Set, Get Active!</strong>
            </p>
            <AuthUserContext.Consumer>
              {(authUser) =>
                !authUser ? (
                  <Container textAlign={'center'}>
                    <Button.Group>
                      <Button as={Link} to={ROUTES.SIGN_IN}>
                        Sign In
                      </Button>
                      <Button.Or />
                      <Button as={Link} to={ROUTES.SIGN_UP}>
                        Sign Up
                      </Button>
                    </Button.Group>
                  </Container>
                ) : (
                  <div></div>
                )
              }
            </AuthUserContext.Consumer>
          </Container>
        </Segment>
      </Container>
    </div>
  );
};

export default Landing;
