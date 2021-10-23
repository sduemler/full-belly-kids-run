import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ActivityList from '../Activities/index.js';
import Navigation from '../Navigation';
import { FirebaseContext, withFirebase } from '../Firebase';
import * as ROUTES from '../Navigation/routes';
import Landing from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <div className='App'>
        <header>
          <div className='wrapper' style={{ textAlign: 'center' }}>
            <h1>Full Belly 5K Kids</h1>
          </div>
        </header>
        <Router>
          <div>
            <Navigation authUser={this.state.authUser} />
            <hr />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.ACTIVITIES} component={ActivityList} />
          </div>
        </Router>
        {/* <div className='container'>
          <section className='all-items'>
            <FirebaseContext.Consumer>  
              {firebase => <ActivityList firebase={firebase} />}
            </FirebaseContext.Consumer>
          </section>
        </div> */}
      </div>
    );
  }
}

export default withFirebase(App);
