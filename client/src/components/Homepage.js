import React, { Component } from 'react'
import {Navbar, Nav, Alert, Card, ListGroup, ListGroupItem, Button, CardColumns, Row, CardDeck, Modal} from 'react-bootstrap'
import axios from 'axios'
import {Redirect} from "react-router-dom"

export default class Homepage extends Component {
  constructor(props) {
    super(props)

    this.displayEvents = this.displayEvents.bind(this)
    this.displayPlaces = this.displayPlaces.bind(this)
    this.displayCaterings = this.displayCaterings.bind(this)
    this.splitInto = this.splitInto.bind(this)
    this.authorized = this.authorized.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.closePopup = this.closePopup.bind(this)

    this.state = {
      id: props.id,
      displaying: "events",
      events: null,
      places: null,
      caterings: null,
      width: 0,
      height: 0,
      deletePopup: {
        show: false
      }
    }
    this.displayEvents()
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
    console.log(arr)
    this.state.displaying = "caterings"
    axios.get("http://localhost:5000/api/caterings/")
      .then((res) => {
        this.state.caterings = res.data.data
        this.setState({...this.state})
      })
      .catch(err => console.log(err))
      let arr = []
  }

  splitInto(arr, section) {
    const res = []
    if (!arr)
      return res
    for (let i = 0; i < arr.length; i += section) {
      res.push(arr.slice(i, Math.min(i + section, arr.length)))
    }
    return res
  }

  authorized() {
    return false
  }

  deleteEvent(id) {
    axios.delete(`http://localhost:5000/api/events/${id}`)
    .then(res => {
      if (res.error)
        alert(res.error.message)
      else if (!res.data.data)
        alert("Something went wrong while trying to delete the event!\n\nPlease try again later")
      else
        this.displayEvents()
    })
    .catch(err => {
      alert("Something went wrong while trying to delete the event!\n\nPlease try again later")
      console.log(err)
    })
  }

  closePopup() {
    this.state.deletePopup = {show: false}
    this.setState({...this.state})
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

        {!this.authorized()
        ? <div>
            <div>
              <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Event Planner</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link onClick={this.displayEvents}>Events</Nav.Link>
                  <Nav.Link onClick={this.displayPlaces}>Places</Nav.Link>
                  <Nav.Link onClick={this.displayCaterings}>Caterings</Nav.Link>
                </Nav>
                <Button href="/newEvent" varient="warning"
                  style={{color: "yellow", borderColor: "yellow"}}>
                  New Event
                </Button>
              </Navbar>
            </div>

            <div>
              {this.state.displaying === "events"
                ? !this.state.events || !this.state.events[0]
                  ? <Alert variant="secondary">No events available</Alert>
                  : <>
                    <h3 style={{color: "blue", margin: 20}}>Events</h3>
                    {this.splitInto(this.state.events, 5).map(arr => 
                      <Row><CardDeck className="col-md-12" style={{margin: 20}}>
                        {arr.map(val => (
                        <Card className="col-md-2" border="primary"> <Card.Body>
                          <Card.Title>{val.type}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted" margin={20}>
                            from:
                            <br/>
                            {new Date(val.time.start_time).toLocaleDateString()}
                            <br/>
                            {new Date(val.time.start_time).toLocaleTimeString()}
                            <br/>
                            <br/>
                            to:
                            <br/>
                            {new Date(val.time.end_time).toLocaleDateString()}
                            <br/>
                            {new Date(val.time.end_time).toLocaleTimeString()}
                          </Card.Subtitle>
                          <Card.Text style={{marginTop: 20}}>{val.description}</Card.Text>
                          <Button
                            variant="danger"
                            style={{marginTop: 20}}
                            onClick={event => {
                              this.state.deletePopup = {
                                show: true,
                                type: val.type,
                                id: val._id
                              }
                              this.setState({...this.state})
                            }}
                          >
                            Delete
                          </Button>

                        </Card.Body> </Card>)
                        )}
                      </CardDeck></Row>
                    )}
                  </>

              : this.state.displaying === "places"
                ? !this.state.places || !this.state.places[0]
                  ? <Alert variant="secondary">No palces available</Alert>
                  : <>
                    <h3 style={{color: "blue", margin: 20}}>Places</h3>
                    {this.splitInto(this.state.places, 5).map(arr => 
                      <Row><CardDeck style={{margin: 20}}>
                        {arr.map(val => (
                        <Card className="col-md-2" border="primary"> <Card.Body>
                          <Card.Title>{val.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">Rating: {val.rating} EGP/hour</Card.Subtitle>
                          <Card.Subtitle className="mb-2 text-muted">{val.pricePerHour} EGP/hour</Card.Subtitle>
                          <Card.Text>{val.location}</Card.Text>
                        </Card.Body> </Card>)
                      )}
                      </CardDeck></Row>
                    )}
                  </>

              : this.state.displaying === "caterings"
                ? !this.state.caterings || !this.state.caterings[0]
                  ? <Alert variant="secondary">No caterings available</Alert>
                  : <>
                    <h3 style={{color: "blue", margin: 20}}>Caterings</h3>
                    {this.splitInto(this.state.places, 5).map(arr => 
                      <Row><CardDeck style={{margin: 20}}>
                        {arr.map(val => (
                        <Card className="col-md-2" border="primary"> <Card.Body>
                          <Card.Title>{val.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">Rating: {val.rating}</Card.Subtitle>
                          {!val.menu || !val.menu[0]
                            ? <></>
                            : <ListGroup className="list-group-flush">
                                {val.menu.map((item, i) => (<ListGroupItem>{item.item}: {item.price} EGP</ListGroupItem>))}
                              </ListGroup>}
                        </Card.Body> </Card>)
                      )}
                      </CardDeck></Row>
                    )}
                  </>
                : <></>
              }
            </div>
          </div>
          : <Redirect to="/login" />
        }

        <Modal
          show={this.state.deletePopup.show}
          onHide={this.closePopup}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete {this.state.deletePopup.type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you want to delete the following event ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closePopup}>
              No
            </Button>
            <Button
              variant="primary"
              onClick={e => {
                console.log(this.state.deletePopup)
                this.deleteEvent(this.state.deletePopup.id)
                this.closePopup(e)
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
