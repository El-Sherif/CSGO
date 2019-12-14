# CSGO
Event Planner Application

#How to run ?

To run the App, follow the following steps:
1. change the directory to /backend
2. run the command **node index**
3. open another terminal
4. change the directory to /client
5. run the command **npm start**

#Dependencies

To install the dependencies please run **npm i** once backend folder and another in client folder
Backend Dependencies:

1. Axios
2. bycrypt
3. passport
4. express
5. nodemailer
6. stripe
7. mongoose

Frontend Dependencies:

1. Axios
2. React libraries
3. particles-bg

#CONFIG

1) create *config* folder
2) create 4 files:
  - keys.js
  - keys_dev.js
  - keys_prod.js
  - passport.js
Example for *keys.js*:

########################

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod')
}
else {
    module.exports = require('./keys_dev')
}

########################
  
Example for *keys_dev.js*:

########################

module.exports = {
    mongoURI: *The Url extracted from atlas*,
    secretOrKey: *Any Hashing Key*,
    SSK: *The Sercret Key extracted from stipe*,
    Email: *The Gmail used for sending emails*,
    Pass: *The Gmail Password*
}

########################

Example for *keys_prod.js*:

########################

module.exports = {
    *Mongo variable used in keys_dev.js*: process.env.MONGO_URI,
    *Secret key variable used in keys_dev.js*:(process.env.STRIPE_SECRET_KEY),
    *Email variable used in keys_dev.js*:(process.env.Email),
    *Password variable used in keys_dev.js*:(process.env.Pass)
}

########################

Example for *passport.js*:

########################

const JwtStrategy = require('passport-jwt').Strategy
 const ExtractJwt = require('passport-jwt').ExtractJwt
 const mongoose = require('mongoose')
 const User = mongoose.model('users')
 const tokenKey = require('./keys').secretOrKey
  
 let opts = {};
 opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
 opts.secretOrKey = tokenKey

 module.exports = passport => {
     passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const currentUser = await User.findById(jwt_payload.id)
        if(currentUser) return done(null,currentUser)
        return done(null,false)
     }))
 }
 
########################

#Docker


The Backend and Forntend are Dockerized and can be run through **docker-compose up** but you have to make sure that you have docker installed.

You can also build through **docker-compose build**

You can stop running **docker-compose down**

The backend runs on port 5000 and the Frontend runs on port 3000

*docker-compose.yml* runs the two docker files(one for backend and another for frontend)

The Docker file for backend runs commands **npm i** to install dependencies and **node index** to run the backend in *./Backend* directory

The Docker file for frontend runs commands **npm i** to install dependencies and **npm start** to run the front in *./client* directory

#Backing Service

MongoDb: NoSQL Database.
Stripe: Online Payment method
Nodemailer: Used for sending emails.

