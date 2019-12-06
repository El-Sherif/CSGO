import { Component } from "react";
import React from "react";
import parseJwt from '../helpers/decryptAuthToken'

class Test extends Component{


render(){
     let id =  parseJwt(localStorage.jwtToken).id;
    
    return (<h1>{id}    </h1>) ;

}

}
export default Test;