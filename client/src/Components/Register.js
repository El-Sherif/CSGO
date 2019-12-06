import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../styles/Login.css";
import axios from "axios";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {

    event.preventDefault();
    const body={email:email,password:password};
    const user = await axios.post(`http://localhost:5000/api/users/login`,body);
    console.log("herer");
  }

  return (
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="gender" bsSize="large">
          <FormLabel>Gender</FormLabel>
          <FormControl
            value={gender}
            onChange={e => setGender(e.target.value)}
            type="gender"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <FormLabel>confirmPassword</FormLabel>
          <FormControl
            value={confirmPassword}
            onChange={e => setconfirmPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="phone" bsSize="large">
          <FormLabel>phone</FormLabel>
          <FormControl
            value={phone}
            onChange={e => setPhone(e.target.value)}
            type="phone"
            />
            </FormGroup>
           <FormGroup controlId="age" bsSize="large">
          <FormLabel>age</FormLabel>
          <FormControl
            value={age}
            onChange={e => setAge(e.target.value)}
            type="age"
          />
                      </FormGroup>

        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}