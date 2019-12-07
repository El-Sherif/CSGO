import React, { Component } from "react";
import { Button, Card, CardDeck } from "react-bootstrap";
import { Label, Input } from 'semantic-ui-react'
import axios from "axios";
import Test from './Test'
import { Collapse } from 'reactstrap'

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateNumber(num) {
  return num.length > 0 && !isNaN(num);
}
class Register extends Component {

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)

    this.state = {
      collapse: false,
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      gender: "",
      phone: "",
      age: "",
      done: false
    }
  }
  // state = {
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   name: "",
  //   gender: "",
  //   phone: "",
  //   age: "",
  //   done: false

  // };
  toggle () {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateRequest(req) {
    let ret = "ok";
    console.log(req.password + " " + req.confirmPassword);
    if (!validateEmail(req.email)) {
      ret = "Please enter a valid mail";
    }
    else if (req.password.length < 8)
      ret = "Password has to be atleast 8 characters long";
    else if (req.password !== req.confirmPassword)
      ret = "The repeated password doesn't match the first one"
    else if (req.name.length == 0)
      ret = "Please enter your name";
    else if (!validateNumber(req.phone))
      ret = "Phone Number contains only digits and cannot be empty";
    else if (!validateNumber(req.age))
      ret = "Age contains only digits and cannot be empty";


    return { msg: ret };
  }
  handleSubmit = async () => {
    if (document.getElementById("male").checked)
      await this.setState({ gender: 'Male' });
    else if (document.getElementById("female").checked)
      await this.setState({ gender: 'Female' });
    else {
      alert("Please choose your gender");
      return;

    }
    const body = {
      email: this.state.email, password: this.state.password
      , balance: 0, name: this.state.name, age: this.state.age, phone: this.state.phone, confirmPassword: this.state.confirmPassword, gender: 'Male'
    };
    let valid = this.validateRequest(body);
    if (valid.msg == 'ok') {


      try {
        const user = await axios.post(`http://localhost:5000/api/users/register`, body);
        if (user.data.error) {
          alert(user.data.error);
          return;
        }
        if (user) {
          // console.log(user.data);
          await this.setState({ done: true });
          alert("You have succesfully registered, please check your email to verify your account");
        }

      }
      catch (error) {
        alert("Something went wrong, please try again");
        console.log(error);
      }
    }
    else
      alert(valid.msg);

  };
  handleGender(event) {
    let id = event.target.id;
    if (id == 'male') {
      document.getElementById("female").checked = false;
    }
    else
      document.getElementById("male").checked = false;

  }
  render() {
    // if (this.state.done) {
    //   return <Test></Test>

    // }
    return (
      <CardDeck>
        <Card border="primary" className="text-center col-md-8" style={{ marginLeft: '20%' }} >
        <Button variant='primary' onClick={this.toggle} >Register</Button>
          <Collapse isOpen={this.state.collapse}>
          <Card.Body>
            {/* <Card.Title>Register</Card.Title> */}
            <Label style={{ margin: 20 }}>
              Name
              </Label>
            <div class="ui focus input"><Input
              type="text"
              id="name"
              placeholder={"Name"}
              onChange={this.handleChange}
            /></div>
            <br />
            <Label style={{ margin: 20 }}>
              Email
              </Label>
            <div class="ui focus input"><Input
              type="email"
              id="email"
              placeholder={"Email"}
              onChange={this.handleChange} /></div>
            <br />
            <Label style={{ margin: 20 }}>
              Password
              </Label>
            <div class="ui focus input"><Input
              type="password"
              id="password"
              onChange={this.handleChange}
              placeholder={"Password"}
            /></div>
            <br />
            <Label style={{ margin: 20 }}>
              Confirm Password
              </Label>
            <div class="ui focus input"><Input
              type="password"
              id="confirmPassword"
              onChange={this.handleChange}
              placeholder={"Confirm Password"}
            /></div>
            <br />
            <Label style={{ margin: 20 }}>
              Age
              </Label>
            <div class="ui focus input"><Input
              type='number'
              id="age"
              onChange={this.handleChange}
              placeholder={"Age"}
            /></div>
            <br />
            <Label style={{ margin: 20 }}>
              Phone
              </Label>
            <div class="ui focus input"><Input
              type="text"
              id="phone"
              onChange={this.handleChange}
              placeholder={"Phone"}
            /></div>
            <br />
            <Label style={{ margin: 20 }}>
              Gender
              </Label>
            Male
              <Input type="radio" id='male' onClick={this.handleGender} style={{ margin: 20 }} />
            Female <Input type="radio" id='female' onClick={this.handleGender} />
            <br />
            <Button variant="primary" onClick={this.handleSubmit} type="submit">Register</Button>
          </Card.Body>
          </Collapse>
        </Card>
      </CardDeck>
      //       <div>
      //         <input
      //           type="email"
      //           id="email"
      //           placeholder={"Email"}
      //           onChange={this.handleChange}
      //           className="form-control col-md-5"
      //           autoComplete="username"
      //         />
      //         <br />
      //         <br />
      //         <input
      //           type="password"
      //           id="password"
      //           onChange={this.handleChange}
      //           placeholder={"password"}
      //           className="form-control col-md-5"
      //         />
      //         <br />
      //         <br />
      //         <input
      //           type="text"
      //           id="name"
      //           placeholder={"name"}
      //           onChange={this.handleChange}
      //           className="form-control col-md-5"
      //         />
      //         <br />
      //         <br />
      //         <input
      //           type="password"
      //           id="confirmPassword"
      //           onChange={this.handleChange}
      //           placeholder={"confirmPassword"}
      //           className="form-control col-md-5"
      //         />
      //         <br />
      //         <br />
      //         <input
      //           type="text"
      //           id="phone"
      //           onChange={this.handleChange}
      //           placeholder={"phone"}
      //           className="form-control col-md-5"
      //         />
      //         <br />
      //         <br />
      //         <input
      //           type="text"
      //           id="age"
      //           onChange={this.handleChange}
      //           placeholder={"age"}
      //           className="form-control col-md-5"
      //         />
      //         <br />
      //         <br />
      //         <form >
      //           Gender

      //  Male <Input type="radio" id='male' onClick={this.handleGender} />
      //           Female <Input type="radio" id='female' onClick={this.handleGender} />

      //         </form>

      //         <Button block bsSize="large" onClick={this.handleSubmit} type="submit">
      //           Register
      //   </Button>

      //       </div>

    );

  }


}
export default Register;