const express = require('express')
const router = express.Router()
const Event = require('../../models/Event')

router.get('/', async (req,res) => {
  try {
    const events = await Event.find()
    res.json({data: events})
  }
  catch(error) {
    console.log(error)
    res.json({error: error})
  }
})

router.post('/', async (req,res) => {
  try {
    const newEvent = await Event.create(req.body)
    if (newEvent) {
      res.json({msg:'Event was created successfully', data: newEvent})
    }
    else {
      res.json({error: "Couldn't create new event"})
    }
  }
  catch(error) {
    console.log(error)
    res.json({error: error})
  }  
})

router.put('/:id', async (req,res) => {
  try {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const event = await Event.findById(req.params.id)
      if(!event) {
        return res.status(404).send({error: 'Event does not exist'})
      }
      const data = req.body
      const updatedEvent = await Event.findByIdAndUpdate({_id : id},data)
      res.json({msg: 'Event updated successfully'})
    }
    else {
      return res.status(400).json({ error: "not valid event id" })
    }
  }
  catch(error) {
    console.log(error)
    res.json({error: error})
  }  
})
 
router.delete('/:id', async (req,res) => {
  try {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const deletedEvent = await Event.findByIdAndRemove(id)
      if (deletedEvent) {
        res.json({msg:'Event was deleted successfully', data: deletedEvent})
      }
      else {
        res.status(404).json({ msg: "Event is not found" })
      }
    }
    else {
      return res.status(400).json({ error: "not valid event id" })
    }
  }
  catch(error) {
    console.log(error)
    res.json({error: error})
  }  
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const u = await Event.findById(id);
      if(u)
        return res.json({ data: u });
      else
        return res.status(404).send({ msg: "Event is not found" });
    }
    else {
      return res.status(400).send({ error: "not valid event id" });
    }
  }
  catch(error) {
    console.log(error)
    res.json({error: error})
  }  
})

module.exports = router