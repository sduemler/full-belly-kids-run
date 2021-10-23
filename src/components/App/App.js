import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ActivityList from '../Activities/ActivityList';
import Navigation from '../Navigation/Navigation';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../Navigation/routes';
import Landing from '../Landing';


function App() {
  return (
    <div className='App'>
        <header>
            <div className='wrapper' style={{textAlign: "center"}}>
              <h1>Full Belly 5K Kids</h1>
            </div>
            {/* <Router>
            <div>
              <Navigation />
            </div> 
           </Router> */}
        </header>
        <div className='container'>
          <section className='all-items'>
            <FirebaseContext.Consumer>  
              {firebase => <ActivityList firebase={firebase} />}
            </FirebaseContext.Consumer>
          </section>
        </div>
      </div>
  );
}

export default App;
