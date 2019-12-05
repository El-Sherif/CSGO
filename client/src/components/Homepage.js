import React, { Component } from 'react'
import {Navbar, Nav, Alert, Card, ListGroup, ListGroupItem, Button, CardColumns, Row, CardDeck} from 'react-bootstrap'
import axios from 'axios'

export default class Homepage extends Component {
  constructor(props) {
    super(props)

    this.displayEvents = this.displayEvents.bind(this)
    this.displayPlaces = this.displayPlaces.bind(this)
    this.displayCaterings = this.displayCaterings.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    this.state = {
      id: props.id,
      displaying: "events",
      events: null,
      places: null,
      caterings: null,
      width: 0,
      height: 0
    }
    this.displayEvents()
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  updateWindowDimensions() {
    this.state.width = window.innerWidth
    this.state.height = window.innerHeight
    this.setState({...this.state})
  }

  displayEvents = () => {
    this.state.displaying = "events"
    axios.get("http://localhost:5000/api/events/")
      .then((res) => {
        this.state.events = res.data.data ? res.data.data.filter((value, idx) => value.owner === this.state.id) : null
        this.setState({...this.state})
      })
      .catch(err => console.log(err))
  }

  displayPlaces = () => {
    this.state.displaying = "places"
    axios.get("http://localhost:5000/api/places/")
      .then((res) => {
        this.state.places = res.data.data
        this.setState({...this.state})
      })
      .catch(err => console.log(err))
  }

  displayCaterings = () => {
    this.state.displaying = "caterings"
    axios.get("http://localhost:5000/api/caterings/")
      .then((res) => {
        this.state.caterings = res.data.data
        this.setState({...this.state})
      })
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div>
        <header>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          />
          
          <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin />

          <script
            src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
            crossorigin
          />
          
          <script
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossorigin
          />
          
          <script>var Alert = ReactBootstrap.Alert;</script>
        </header>

        <div>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Event Planner</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="mr-auto">
              <Nav.Link onClick={this.displayEvents}>Events</Nav.Link>
              <Nav.Link onClick={this.displayPlaces}>Places</Nav.Link>
              <Nav.Link onClick={this.displayCaterings}>Caterings</Nav.Link>
            </Nav>
            <Button href="/newEvent" varient="warning" style={{color: "yellow", borderColor: "yellow"}}>New Event</Button>
          </Navbar>
        </div>

        <div>
          {this.state.displaying === "events"
            ? !this.state.events || !this.state.events[0]
              ? <Alert variant="secondary">No events available</Alert>
              : <>
                <h3 style={{color: "blue", margin: 20}}>Events</h3>
                <CardDeck style={{margin: 20}}>{
                this.state.events
                .map((val, idx) =>
                  (<Card> <Card.Body>
                    <Card.Title>{val.type}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" margin={20}>from {val.time.start_time} to {val.time.end_time}</Card.Subtitle>
                    <Card.Text>{val.description}</Card.Text>
                  </Card.Body> </Card>))
                }</CardDeck>
                </>

          : this.state.displaying === "places"
            ? !this.state.places || !this.state.places[0]
              ? <Alert variant="secondary">No palces available</Alert>
              : <>
                <h3 style={{color: "blue", margin: 20}}>Places</h3>
                <CardDeck style={{margin: 20}}>{
                this.state.places
                .map((val, idx) =>
                  (<Card> <Card.Body>
                    <Card.Title>{val.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Rating: {val.rating} EGP/hour</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{val.pricePerHour} EGP/hour</Card.Subtitle>
                    <Card.Text>{val.location}</Card.Text>
                  </Card.Body> </Card>))
              }</CardDeck>
              </>

          : this.state.displaying === "caterings"
            ? !this.state.caterings || !this.state.caterings[0]
              ? <Alert variant="secondary">No caterings available</Alert>
              : <>
                <h3 style={{color: "blue", margin: 20}}>Caterings</h3>
                <CardDeck style={{margin: 20}}>{
                this.state.caterings
                .map((val, idx) =>
                  (<Card> <Card.Body>
                    <Card.Title>{val.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Rating: {val.rating}</Card.Subtitle>
                    {!val.menu || !val.menu[0]
                      ? <></>
                      : <ListGroup className="list-group-flush">
                          {val.menu.map((item, i) => (<ListGroupItem>{item.item}: {item.price} EGP</ListGroupItem>))}
                        </ListGroup>}
                  </Card.Body> </Card>))
                }</CardDeck>
                </>
            : <></>
          }
        </div>
      </div>
    )
  }
}
