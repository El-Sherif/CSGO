import React, { Component, Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "../../node_modules/axios";
const publishableKey = "pk_test_ehyd5U1bJZcul9sAObB3D8fV00XSCtZpBn";
export class stripeBtn extends Component {
  constructor(props) {
    super(props)
  }

  onToken = (token) => {
    const body = {
      amount: this.props.fees,
      token: token,
      EID: this.props.EId
    }; axios
      .post("http://localhost:5000/api/users/payfees", body)
      .then(response => {
        // console.log(111)
        console.log(response);
        alert("Payment Success");
        window.location.reload()
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  render() {
    return (
      <StripeCheckout
        label="Pay Fees" //Component button text
        name="Event Fees"
        description="Pay Event Fees"
        panelLabel="Pay fees" //Submit button in modal
        amount={(this.props.fees*100/18)}
        token={this.onToken}
        stripeKey={publishableKey}
        billingAddress={false}
      />
    );
  }
}; export default stripeBtn;