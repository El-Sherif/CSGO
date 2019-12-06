import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Test from './Test'
class Login extends Component {

  state = {
    email: "",
    password: "",
    loggedIn: false,
    
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
   validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleSubmit = async () => {
    const body={email:this.state.email,password:this.state.password};
    try{
      const user = await axios.post(`http://localhost:5000/api/users/login`,body);
      if(user){
        localStorage.setItem("jwtToken", user.data.data);
        await this.setState({ loggedIn: true });
      }

    }
    catch(error){
      alert("Wrong Email or Password");
    }
  };
  render() {
    if (this.state.loggedIn) {
      return <Test></Test>
      
    }
    return (
    <div>
    <input
    type="email"
    id="email"
    onChange={this.handleChange}
    className="form-control"
    placeholder={ "Email"    }
    autoComplete="username"
  />
  <br />
  <br />
  <input
    type="password"
    id="password"
    onChange={this.handleChange}
    className="form-control"
    placeholder={ "password"    }
  />
  <Button block bsSize="large" disabled={!this.validateForm()}  onClick={this.handleSubmit}
type="submit">
          Login
        </Button>

  </div>
  
    );

  }
    

}
export default Login;