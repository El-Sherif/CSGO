import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Test from './Test'
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateNumber(num){
  return num.length>0 && !isNaN(num);
}
class Register extends Component {

  state = {
    email: "",
    password: "",
    confirmPassword:"",
    name:"",
    gender: "",
    phone:"",
    age:"",
    done:false
    
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  
  validateRequest(req){
    let ret="ok";
    console.log(req.password+" "+req.confirmPassword);
    if(!validateEmail(req.email)){
     ret="Please enter a valid mail";
    }
    else if(req.password.length<8)
    ret="Password has to be atleast 8 characters long";
    else if(req.password!==req.confirmPassword)
    ret="The repeated password doesn't match the first one"
    else if(req.name.length==0)
    ret="Please enter your name";
    else if(!validateNumber(req.phone))
    ret="Phone Number contains only digits and cannot be empty";
    else if(!validateNumber(req.age))
    ret="Age contains only digits and cannot be empty";


    return {msg:ret};
  }
  handleSubmit = async () => {
    if(document.getElementById("male").checked)
    await this.setState({gender:'Male'});
    else if(document.getElementById("female").checked)
    await this.setState({gender:'Female'});
    else
    {
      alert("Please choose your gender");
      return;

    }
    const body={email:this.state.email,password:this.state.password
    ,balance:0,name:this.state.name,age:this.state.age,phone:this.state.phone,confirmPassword:this.state.confirmPassword,gender:'Male'};
    let valid=this.validateRequest(body);
    if(valid.msg=='ok')
    {

    
    try{
      const user = await axios.post(`http://localhost:5000/api/users/register`,body);
      if(user.data.error){
        alert(user.data.error);
        return;
      }
      if(user){
        console.log(user.data);
        await this.setState({ done: true });
        alert("You have succesfully registered, please check your email to verify your account");
      }

    }
    catch(error){
      alert("Something went wrong, please try again");
      console.log(error);
    }
  }
  else  
   alert(valid .msg);

  };
   handleGender(event){
     let id=event.target.id;
     if(id=='male'){
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
   <br />
  <br />
  <input
    type="text"
    id="name"
    onChange={this.handleChange}
    className="form-control"
    placeholder={ "name"    }
  />
   <br />
  <br />
  <input
    type="password"
    id="confirmPassword"
    onChange={this.handleChange}
    className="form-control"
    placeholder={ "confirmPassword"    }
  />
   <br />
  <br />
  <input
    type="text"
    id="phone"
    onChange={this.handleChange}
    className="form-control"
    placeholder={ "phone"    }
  />
  <br />
  <br />
  <input
    type="text"
    id="age"
    onChange={this.handleChange}
    className="form-control"
    placeholder={ "age"}
  />
  <br />
  <br />
  <form>
  Gender

 Male <input type="radio" id='male' onClick={this.handleGender}/>
  Female <input type="radio" id='female' onClick={this.handleGender}/>

  </form>

  <Button block bsSize="large"  onClick={this.handleSubmit} type="submit">
    Register
  </Button>

  </div>
  
    );

  }
    

}
export default Register;