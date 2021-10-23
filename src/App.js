import './App.css';
import ActivityList from './components/Activities/ActivityList';
import { FirebaseContext } from './components/Firebase';



function App() {
  return (
    <div className='App'>
        <header>
            <div className='wrapper' style={{textAlign: "center"}}>
              <h1>Full Belly 5K Kids</h1>
            </div>
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
