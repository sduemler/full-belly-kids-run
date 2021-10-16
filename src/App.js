import './App.css';
import ActivityList from './components/Activities/ActivityList';
import { FirebaseContext } from './components/Firebase';



function App() {
  return (
    <div className='App'>
        <header>
            <div className='wrapper'>
              <h1>Full Belly 5K Kids</h1>
              
            </div>
        </header>
        {/* <div className='container'>
          <section className='add-item'>
              <form>
                <input type="text" name="username" placeholder="What's your name?" />
                <input type="text" name="currentItem" placeholder="What are you bringing?" />
                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              </ul>
            </div>
          </section>
        </div> */}
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
