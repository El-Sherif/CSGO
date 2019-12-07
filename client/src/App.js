import React from 'react';
import Login from './Components/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './Components/Register';
import testt from './Components/Test'
import ReactDOM from 'react-dom'

import './App.css';

function App() {
  return (
    <Router>

      {/* <div class='row'>
      <div class='column'
        style={{ margin: 20 }}>
        <Register />
      </div>
      <div class='column'
        style={{ margin: 20 }}>
        <Login />
      </div>
    </div> */}
      <div className="App">
        <Route exact path="/register" component={Register} />
        {/* <Route exact path="/test" component={testt} /> */}
        <Route exact path="/login" component={Login} />
        
      </div>
    </Router>
  );
}


export default App;