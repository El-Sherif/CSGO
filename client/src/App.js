import React from 'react';
import Login from './Components/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './Components/Register';
import ForgetPassword from './Components/ForgetPassword'
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
        <Route exact path="/forgetpassword" component={ForgetPassword} />
      </div>
    </Router>
  );
}


export default App;