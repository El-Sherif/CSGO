import React, { Component } from "react";
import { Button, Card, CardDeck } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Label, Input } from 'semantic-ui-react'
import axios from "axios";
import Test from './Test'
import { Collapse } from 'reactstrap'

class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            collapse: false,
            collapse1: false,
            collapse2: false,
            email: "",
            resetKey: "",
            password: "",
            confirmPassword: "",
            ebox: true,
            trans: ""
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
        return this.state.email.length > 0;
    }
    validateForm1() {
        return this.state.resetKey.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0;
    }
    handleSubmit1 = async () => {
        const body = { email: this.state.email };
        try {
            const Msg = await axios.post(`http://localhost:5000/api/users/forgetMyPassword`, body);
            if (Msg.data.msg === 'Valid') {
                alert("A reset key was sent to your Email. Please enter it below to be able to reset your password");
                this.setState({ collapse1: true })
                this.setState({ ebox: false })
            }
            else {
                alert("Wrong Email");
            }
        }
        catch (error) {
            alert("Wrong Email");
        }
    };
    handleSubmit2 = async () => {
        if (!(this.state.password === this.state.confirmPassword)) { alert("Password Mismatch.-_- شكلك مش فايق وهتتعبني معاك") }

        else {
            const body = { email: this.state.email, password: this.state.password, resetKey: this.state.resetKey };
            try {
                const Msg = await axios.post(`http://localhost:5000/api/users/resetMyPassword`, body);
                if (Msg.data.msg === 'Valid') {
                    alert("Your password was changed successfully. -_- بس متتعودش علي كده");
                    this.setState({ trans: '/login' })
                    // return <Redirect to={{ pathname: "/login" }} />
                }
                else {
                    alert(Msg.data.msg);
                }
            }
            catch (error) {
                alert("Error! Please try again later");
            }
        };
    }
    render() {
        if (this.state.trans.length > 0) {
            return <Redirect to={{ pathname: this.state.trans }} />
        }
        if (localStorage.getItem('jwtToken')) {
            return <Redirect to={{ pathname: "/" }} />
        }
        return (
            <CardDeck>
                <Card border="primary" className="text-center col-md-8" style={{ marginLeft: '20%' }} >
                    <Button disabled={true} variant='primary' onClick={this.toggle} >Forget Password</Button>
                    {/* <Collapse isOpen={this.state.collapse}> */}
                    <Card.Body>
                        {/* <Card.Title>Register</Card.Title> */}
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
                        <Button variant="primary" disabled={!this.validateForm() || !this.state.ebox} onClick={this.handleSubmit1}
                            type="submit">I Forgot My Password :(</Button>
                        <Collapse isOpen={this.state.collapse1}>
                            <Label style={{ margin: 20 }}>
                                Reset Key
              </Label>
                            <div class="ui focus input"><Input
                                type="password"
                                id="resetKey"
                                placeholder={"Reset Key"}
                                onChange={this.handleChange}
                            /></div>
                            <br />
                            <Label style={{ margin: 20 }}>
                                New Password
              </Label>
                            <div class="ui focus input"><Input
                                type="password"
                                id="password"
                                placeholder={"New Password"}
                                onChange={this.handleChange}
                            /></div>
                            <br />
                            <Label style={{ margin: 20 }}>
                                Confirm Password
              </Label>
                            <div class="ui focus input"><Input
                                type="password"
                                id="confirmPassword"
                                placeholder={"Confirm Password"}
                                onChange={this.handleChange}
                            /></div>
                            <br />
                            <Button variant="primary" disabled={!this.validateForm1()}
                                onClick={this.handleSubmit2}
                                type="submit">Reset My Password :(</Button>
                        </Collapse>
                    </Card.Body>
                    {/* </Collapse> */}
                </Card>
            </CardDeck>
        );
    }
}
export default ForgetPassword;