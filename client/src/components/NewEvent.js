import React, { Component } from 'react'
import {Navbar, Nav, Button, Alert, Form, FormControl, Col, Row, Dropdown, Badge, Accordion, Card, Spinner} from 'react-bootstrap'
import axios from 'axios'

export default class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
    this.newEvent = {time: {}, catering: {items: []}}
    this.selectCatering = this.selectCatering.bind(this)
    this.calculatePrice = this.calculatePrice.bind(this)
    this.submit = this.submit.bind(this)
    this.header = this.header.bind(this)

    axios.get("http://localhost:5000/api/places/")
      .then(resPlaces => {
        axios.get("http://localhost:5000/api/caterings/")
        .then(resCaterings => {
          const tempState = {
            places: resPlaces.data.data? resPlaces.data.data : null,
            errorPlaces: resPlaces.data.error ? resPlaces.data.error : null,

            caterings: resCaterings.data.data? resCaterings.data.data : null,
            errorCaterings: resCaterings.data.error ? resCaterings.data.error : null
          }

          const highestCatering = tempState.caterings
            ? tempState.caterings.sort((a, b) => b.rating - a.rating)[0]
            : undefined
          const highestPlace = tempState.places
            ? tempState.places.sort((a, b) => b.rating - a.rating)[0]
            : undefined
          this.newEvent.catering = {
            cateringID: highestCatering._id,
            items: highestCatering
              .menu.map(val => {return {itemName: val.item, itemAmount: 0, price: val.price}})
            }
          this.newEvent.place = highestPlace.name

          this.setState({
            ...tempState,
            loading: false,
            place: highestPlace.name,
            catering: highestCatering,
            cateringItems: this.newEvent.catering.items
          })
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  selectCatering(event) {
    this.state.catering = this.state.caterings.find(val => event.target.value === val.name)
    this.newEvent.catering = {
      cateringID: this.state.catering._id,
      items:
        this.state.catering
          .menu.map(val => {return {itemName: val.item, itemAmount: 0, price: val.price}})
    }
    this.state.cateringItems = this.newEvent.catering.items
    this.setState({...this.state})
    console.log(this.state)
  }
  
  checkoutToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
      ref={ref}
      onClick={e => {
        // e.preventDefault();
        this.calculatePrice()
        onClick(e);
      }}
      style={{margin: 20}}
    >
      {children}
      &#x25bc;
    </Button>
  ));

  checkoutMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      // console.log(this.state.price)
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl plaintext readOnly style={{marginLeft: 20}}
            defaultValue={`Total Price: ${this.state.price} EGP`}
          />

          <Button type="submit" varient="success" style={{marginLeft: 20}}
            onClick={this.submit}>Submit</Button>

          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              child => child.props.children.toLowerCase(),
            )}
          </ul>
        </div>
      );
    },
  );

  calculatePrice() {
    console.log(this.newEvent)
    let price = 0
    if (this.newEvent.time.start_time && this.newEvent.time.end_time) {
      const totalTime = this.newEvent.time.end_time.getTime() - this.newEvent.time.start_time.getTime()
      if (totalTime < 0) {
        price += 0
      }
      else {
        const place = this.state.places.find(val => val.name === this.newEvent.place)
        price += totalTime / 3600000 * place.pricePerHour
      }
    }
    else {
      price += 0
    }
    this.newEvent.catering.items.forEach(item => {
      console.log(item)
      console.log(Number(item.itemAmount))
      console.log(item.price)
      price += Math.max(0, Number(item.itemAmount) * item.price)
    })
    console.log(price)
    this.state.price = price
    this.setState({...this.state})
    console.log(this.state)
  }

  submit() {
    const myEvent = {...this.newEvent}
    if (!(newEvent.type && newEvent.description && newEvent.time.start_time && newEvent.time.end_time
    && newEvent.place && newEvent.catering &&
    (!newEvent.catering.items || newEvent.catering.items
      .map(val => val.itemAmount >= 0)
      .reduce((curr, pre) => curr && pre)))){
        
        alert("Please complete the form correctly")
        return
    }

    myEvent.owner = this.props.id
    myEvent.place = this.state.places.find(val => val.name === myEvent.place)._id
    myEvent.Ticket_price = this.state.price
    
    axios.post("http://localhost:5000/api/events", myEvent)
      .then(this.setState({...this.state, submitted: true}))
      .catch(err => console.log(err))
  }

  header() {
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

        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Event Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="mr-auto">
            <Nav.Link href="localhost:5000/">Home</Nav.Link>
          </Nav>
          <Button href="/newEvent" varient="warning"
            style={{color: "yellow", borderColor: "yellow"}}>New Event</Button>
        </Navbar>
      </div>
    )
  }

  render() {
    if (this.state.submitted)
      return (
        <div>
          {this.header()}
          <Alert variant="success" style={{margin: 20}}>
            Your event has been created successfully
          </Alert>
        </div>
      )

    if (this.state.loading)
      return (<div>{this.header()} <Spinner animation="border" variant="primary" /></div>)

    if (this.state.erroePlaces || this.state.errorCaterings)
      return (
        <div>
          {this.header()}

          { this.state.errorPlaces
            ? <Alert variant="danger" style={{margin: 20}}>
              Error occured while fetching available places: <br></br>
              {this.state.errorPlaces}
            </Alert>
            : <></>
          }
          <br></br>
          { this.state.errorCaterings
            ? <Alert variant="danger" style={{margin: 20}}>
              Error occured while fetching available caterings: <br></br>
              {this.state.errorCaterings}
            </Alert>
            : <></>
          }
        </div>
      )
    return (
      <div>
        {this.header()}

        <div>
          <Form>
            <Form.Group style={{margin: 20}}>
              <Form.Label><b>Type</b></Form.Label>
              <Form.Control required type="text" placeholder="Type"
                onChange={e => this.newEvent.type = e.target.value} />
            </Form.Group>
            <Form.Group style={{margin: 20}}>
              <Form.Label><b>Description</b></Form.Label>
              <Form.Control required as="textarea" rows="3"
                onChange={e => this.newEvent.description = e.target.value} />
            </Form.Group>
            <Form.Group style={{margin: 20}}>
              <Form.Label><b>Start time</b></Form.Label>
              <Form.Control required type="datetime-local"
                onChange={e => {
                  this.newEvent.time.start_time = this.state.start = new Date(e.target.value)
                  this.setState({...this.state})
                }} />
              {this.state.start && this.state.end
              && this.state.end.getTime() - this.state.start.getTime() < 0
                ? <Badge variant="danger">Start time should not come after end time</Badge>
                : <></>
              }
            </Form.Group>
            <Form.Group style={{margin: 20}}>
              <Form.Label><b>End time</b></Form.Label>
              <Form.Control required type="datetime-local"
                onChange={e => {
                  this.newEvent.time.end_time = this.state.end = new Date(e.target.value)
                  this.setState({...this.state})
                }} />
              {this.state.start && this.state.end
              && this.state.end.getTime() - this.state.start.getTime() < 0
                ? <Badge variant="danger">Start time should not come after end time</Badge>
                : <></>
              }
            </Form.Group>
            <Form.Group style={{margin: 20}}>
              <Form.Label><b>Ticket Price</b> (EGP)</Form.Label>
              <Form.Control required type="number" placeholder="0"
                onChange={e => this.newEvent.Ticket_price = this.state.Ticket_price = e.target.value} />
                {this.state.TicketPrice < 0
                  ? <Badge variant="danger">Ticket price can not be negative</Badge>
                  : <></>
                }
            </Form.Group>
            <Form.Group style={{margin: 20}}>
              <Form.Label><b>Place</b></Form.Label>
              <Form.Control required as="select"
                onChange={e => this.newEvent.place = this.state.places.find(
                  val => val.name === e.target.value)._id}>
                {/* <option></option> */}
              { this.state.places
                ? this.state.places.sort((a, b) => b.rating - a.rating).map((place, idx) =>
                    <option>{place.name}</option>)
                : <></>
              }
              </Form.Control>
            </Form.Group>
            <Form.Group style={{margin: 20}}>
              <Form.Label><b>Catering</b></Form.Label>
              <Form.Control required as="select" onChange={this.selectCatering}>
                {/* <option></option> */}
              { this.state.caterings
                ? this.state.caterings.sort((a, b) => b.rating - a.rating).map((catering, idx) =>
                    <option>{catering.name}</option>)
                : <></>
              }
              </Form.Control>
            </Form.Group>
            { this.state.catering
              ? this.state.catering.menu[0]
                ? this.state.catering.menu.map((item, idx) => (
                  <>
                    <Row style={{marginLeft: 20}}>
                      <Form.Label column sm="4">{item.item} ({item.price} EGP)</Form.Label>
                      <Col sm="2" style={{width: 50}}>
                        <Form.Control type="number" placeholder="quantity"
                          onChange={e => {
                            const index = this.newEvent.catering.items.findIndex(
                              (val, i) => val.itemName === item.item)
                            this.newEvent.catering.items[index].itemAmount = e.target.value
                            this.state.cateringItems[index].itemAmount = e.target.value
                            this.setState({...this.state})
                            // if (idx === -1)
                            //   this.newEvent.catering.items.push([{
                            //     itemName: item.item,
                            //     itemAmount: e.target.value
                            //   }])
                            // else
                          }} />
                      </Col>
                    </Row>
                    {this.state.cateringItems[idx].itemAmount < 0
                      ? <Badge variant="danger" style={{marginLeft: 40}}>
                          Catering item can not be negative
                        </Badge>
                      : <></>
                    }
                  </>
                ))
                : <Alert variant="warning" style={{margin: 20}}>
                    This catering does not contain any food items
                  </Alert>
              : <></>
            }
            <Form.Group style={{margin: 20}}>
              <Form.Label><b>Food Items</b></Form.Label>
            </Form.Group>

            <Accordion style={{margin: 20}}>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="primary" eventKey="0"
                    onClick={this.calculatePrice}>
                    Checkout
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <>
                    <Card.Body style={{marginLeft: 20}}>Total Price: {this.state.price} EGP</Card.Body>
                    <Button type="submit" varient="success" style={{marginLeft: 20, marginBottom: 20}}
                      onClick={this.submit}>Submit</Button>
                  </>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {/* <Dropdown drop="down" style={{marginBottom: 120, marginTop: 90}}>
              <Dropdown.Toggle as={this.checkoutToggle} id="dropdown-custom-components"
                style={{margin: 20}}>
                Checkout
              </Dropdown.Toggle>
              <Dropdown.Menu as={this.checkoutMenu}> */}
                {/* <Dropdown.Item onClick={this.submit}>Submit</Dropdown.Item> */}
              {/* </Dropdown.Menu>
            </Dropdown> */}
            {/* <Row style={{height: 50}} /> */}
          </Form>
        </div>
      </div>
    )
  }
}
