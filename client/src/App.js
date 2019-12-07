import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import NewEvent from './components/NewEvent';
import {BrowserRouter as Router, Route} from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
        </header> */}
        <Route exact path="/newEvent" component={() => <NewEvent id="5dd9eb048c4fe83a9c3c069e" />}/>
      </div>
    </Router>
  );
}

export default App;
