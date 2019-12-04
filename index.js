const express = require('express')
const mongoose = require('mongoose')
const parser = require('body-parser')
const events = require('./routes/api/events')
const places = require('./routes/api/places')
const caterings = require('./routes/api/caterings')
const users = require('./routes/api/users')

const db = require('./config/keys').mongoURI
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

const http = require('http');
app = express();
server = http.createServer(app),


// Init middleware
app.use(parser.urlencoded({
  extended: false
}));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.get('/', (req,res) => {
        res.send(`<h1>CS GO</h1>`)
})
app.use('/api/events', events)
app.use('/api/places', places)
app.use('/api/caterings', caterings)
app.use('/api/users', users)

app.use((req,res) =>
res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 5000
server.listen(port, () => console.log(`Server on ${port}`))
