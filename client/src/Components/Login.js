import React, { Component } from "react";
import { Button, Card, CardDeck } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Label, Input } from 'semantic-ui-react'
import axios from "axios";
import ParticlesBg from "particles-bg";

class Login extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)

    this.state = {
      collapse: false,
      email: "",
      password: "",
      loggedIn: false,
    };
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleSubmit = async () => {
    const body = { email: this.state.email, password: this.state.password };
    try {
      const user = await axios.post(`http://localhost:5000/api/users/login`, body);
      if (user) {
        let token = user.data.data;
        localStorage.setItem("jwtToken", token);
        axios.defaults.headers.common['Authorization'] = token
        await this.setState({ loggedIn: true });

      }

    }
    catch (error) {
      alert("Wrong Email or Password");
    }
  };
  render() {
    if (localStorage.getItem('jwtToken')) {
      return <Redirect to={{ pathname: "/" }} />
    }
    return (
      <div>
        <ParticlesBg type="cobweb" bg={true} />

        <CardDeck>
          <Card border="primary" className="text-center col-md-8" style={{ marginLeft: '20%', opacity: 0.85 }} >
            <Button variant='primary' disabled={true} onClick={this.toggle} >Login</Button>
            <Card.Body>
              <Label style={{ margin: 20 }}>
                Email
              </Label>
              <div class="ui focus input"><Input
                type="email"
                id="email"
                placeholder={"Email"}
                onChange={this.handleChange}
              /></div>
              <br />
              <Label style={{ margin: 20 }}>
                Password
              </Label>
              <div class="ui focus input"><Input
                type="password"
                id="password"
                placeholder={"Password"}
                onChange={this.handleChange}
              /></div>
              <br />
              <Button style={{ margin: 20 }} variant="outline-primary" href="/register"
                type="submit">Register</Button>
              <Button variant="primary" disabled={!this.validateForm()} onClick={this.handleSubmit}
                type="submit">Login</Button>
              <br />
              <Button variant="outline-secondary" href="/forgetpassword"
                type="submit">Forget password</Button>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    );

  }


}
export default Login;