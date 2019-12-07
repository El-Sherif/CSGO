const express = require('express')
const axios = require('axios')
const router = express.Router()
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')
const User = require('../../models/User')
var jwt_decode = require('jwt-decode');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenKey = require('../../config/keys_dev').secretOrKey;
const passport = require('passport');
require('../../config/passport')(passport);

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post('/forgetMyPassword', async (req, res) => {
  try {

    const UserEmail = req.body.email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.json({ msg: 'Not Valid' })
    }
    const generatedKey = makeid(9)

    const resetedUser = await User.findByIdAndUpdate({ _id: user._id }, { resetKey: generatedKey })
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'csgo.oza@gmail.com',
        pass: 'kokowawa'
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Event Planner"', // sender address
      to: UserEmail, // list of receivers
      subject: "Reset Key", // Subject line
      text: "Your Reset Key is : " + generatedKey, // plain text body
    });
    res.json({ msg: 'Valid' })
  } catch (error) {
    console.log(error)
    res.json({error: error})
  }
})

router.post('/resetMyPassword', async (req, res) => {
  try {
    const newPassword = req.body.password
    const user = await User.findOne({ email: req.body.email })
    if (user.resetKey === req.body.resetKey) {
      await axios.put(`/api/users/${user._id}`, { password: newPassword })
      res.json({ msg: 'Valid' })
    }
    else {
      res.json({ msg: 'Not Valid' })
    }
  } catch (error) {
    console.log(error)
    res.json({error: error})
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json({ data: users })
  }
  catch(error) {
    console.log(error)
    res.json({error: error})
  }
})

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    if (newUser) {
      res.json({ msg: 'User was created successfully', data: newUser })
    }
    else {
      res.json({error: "Couldn't create new user"})
    }
  }
  catch (error) {
    console.log(error)
    res.json({error: error})
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById(id)
      if (!user) {
        return res.status(404).send({ error: 'User does not exist' })
      }
      const data = req.body
      if (data.password) {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(data.password, salt)
        data.password = hashedPassword
      }
      const updatedUser = await User.findByIdAndUpdate({ _id: id }, data, { new: true })
      res.json({ msg: 'User updated successfully' })
    }
    else {
      return res.status(400).json({ error: "not valid user id" })
    }
  }
  catch (error) {
    console.log(error)
    res.json({error: error})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const deletedUser = await User.findByIdAndRemove(id)
      if (deletedUser) {
        res.json({ msg: 'User was deleted successfully', data: deletedUser })
      }
      else {
        res.status(404).json({ msg: "User is not found" })
      }
    }
    else {
      return res.status(400).json({ error: "not valid user id" })
    }
  }
  catch (error) {
    // We will be handling the error later
    console.log(error)
    res.json({error: error})
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const u = await User.findById(id);
      if (u)
        return res.json({ data: u });
      else
        return res.status(404).send({ msg: "User is not found" });
    }
    else {
      return res.status(400).send({ error: "not valid user id" });
    }
  }
  catch (error) {
    console.log(error)
    res.json({error: error})
  }
})

router.post('/populate/5650', async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    var population = [
      {
        "balance": "847187.8",
        "age": 21,
        "password": "kokowawa",
        "name": "ElSherif",
        "email": "ahmedelsherif98j@gmail.com",
        "phone": "+201141516699"
      },
      {
        "balance": "128173.5",
        "age": 27,
        "password": "Eden",
        "name": "PaulaBecker",
        "email": "paulabecker.paulabecker@gmail.com",
        "phone": "+20 (842) 586-2173"
      },
      {
        "balance": "41724.2",
        "age": 29,
        "password": "Brutus",
        "name": "RileyCortez",
        "email": "rileycortez.rileycortez@gmail.com",
        "phone": "+20 (826) 419-3347"
      },
      {
        "balance": "37475.3",
        "age": 22,
        "password": "Bath",
        "name": "OliviaLewis",
        "email": "olivialewis.olivialewis@gmail.com",
        "phone": "+20 (903) 482-2181"
      },
      {
        "balance": "145541.3",
        "age": 20,
        "password": "Keyport",
        "name": "MaeBryant",
        "email": "maebryant.maebryant@gmail.com",
        "phone": "+20 (848) 595-2426"
      },
      {
        "balance": "215625.7",
        "age": 25,
        "password": "Gorham",
        "name": "DudleyAlexander",
        "email": "dudleyalexander.dudleyalexander@gmail.com",
        "phone": "+20 (847) 489-2480"
      },
      {
        "balance": "779862.7",
        "age": 30,
        "password": "Boyd",
        "name": "VilmaBarr",
        "email": "vilmabarr.vilmabarr@gmail.com",
        "phone": "+20 (930) 531-3685"
      },
      {
        "balance": "802630.1",
        "age": 40,
        "password": "Kansas",
        "name": "AliceWilson",
        "email": "alicewilson.alicewilson@gmail.com",
        "phone": "+20 (895) 514-2614"
      },
      {
        "balance": 253378,
        "age": 39,
        "password": "Gwynn",
        "name": "SimsHays",
        "email": "simshays.simshays@gmail.com",
        "phone": "+20 (905) 404-2739"
      },
      {
        "balance": "31810.9",
        "age": 23,
        "password": "Cobbtown",
        "name": "DeenaHale",
        "email": "deenahale.deenahale@gmail.com",
        "phone": "+20 (915) 533-3316"
      }
    ]
    var Cusers = []
    for (var i = 0; i < population.length; i++) {
      population[i].password = bcrypt.hashSync(population[i].password, salt)
      Cusers.push(await User.create(population[i]))
    }
    res.json({ msg: 'Users was created successfully', data: Cusers })
  }
  catch (error) {
    console.log(error)
    res.json({error: error})
  }
})

router.post('/register', async (req, res) => {
  try {
    const usere = await User.findOne({ email: req.body.email })
    if (usere) {
      return res/* .status(400) */.json({ error: 'Email already exists', msg: "Email already exists" })
    }
    const userp = await User.findOne({ phone: req.body.phone })
    if (userp) {
      return res/* .status(400) */.json({ error: 'Phone already exists', msg: "Phone already exists" })
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      phone: req.body.phone,
      age: req.body.age,
      balance: req.body.balance
    })
    const CrnewUser = await User.create(newUser)

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'csgo.oza@gmail.com',
        pass: 'kokowawa'
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Event Planner"', // sender address
      to: req.body.email, // list of receivers
      subject: "User verification", // Subject line
      text: "To verify your account please click one the following link : http://localhost:5000/api/users/verify/" + CrnewUser._id, // plain text body
    });

    res.json({ msg: 'User was created successfully', data: CrnewUser })
  }
  catch (err) {
    console.log(err)
    res.json({ error: 'Can not create user' })
  }
})

router.get('/verify/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }
    if (user.verified === true) {
      return res.status(400).json({ msg: 'User already verified' });
    }
    user.verified = true
    await User.findByIdAndUpdate(req.params.id, user, { new: true })
    res.json({ msg: 'User was verified successfully' })
  }
  catch (e) {
    console.log(e)
    res.json({error: e})
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email does not exist' });
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      }
      const token = jwt.sign(payload, tokenKey, { expiresIn: '24h' })
      return res.json({ data: `Bearer ${token}` })
      // return res.json({ data: 'Token' })
    }
    else return res.status(400).send({ password: 'Wrong password', msg: "wrong password" });
  } catch (e) {
    console.log(e)
    res.json({error: e})
  }
});

// router.post('/gettingData',async(req,res)=>{
//   var token = req.body.token;
//   var decoded = jwt_decode(token);
//   const id = decoded.id
//   const returnedUser = await User.findById(id)
//   if(returnedUser)
//         return res.json({data:returnedUser.email});
//       else
//         return res.send({ msg: "User is not found" });
// })

// router.post('/emails', async (req,res) => {
//     const users = await User.find()
//     const emails =[]
//     for(var i=0;i<users.length;i++)
//     {
//       emails[i]=users[i].email
//     }

//     res.json({data: emails})
// })

module.exports = router