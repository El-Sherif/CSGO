import React from 'react';
import Homepage from './Components/Homepage';
import NewEvent from './Components/NewEvent';
import Login from './Components/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './Components/Register';
import ForgetPassword from './Components/ForgetPassword'
import ReactDOM from 'react-dom'
import parseJwt from './helpers/decryptAuthToken'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={() => (localStorage.getItem('jwtToken')) ?
          <Homepage id={parseJwt(localStorage.jwtToken).id} /> :
          <Homepage id="" />
        } />
        <Route exact path="/newEvent" component={() => (localStorage.getItem('jwtToken')) ?
          <NewEvent id={parseJwt(localStorage.jwtToken).id} />
          : <NewEvent id="" />} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgetpassword" component={ForgetPassword} />
      </div>
    </Router>
  );
}


export default App;