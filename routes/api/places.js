const express = require('express')
const router = express.Router()
const Place = require('../../models/Place')

router.get('/', async (req,res) => {
  try {
    const places = await Place.find()
    res.json({data: places})
  }
  catch(error) {
    console.log(error)
    res.json({error: error})
  }
})

router.post('/', async (req,res) => {
  try {
    const newPlace = await Place.create(req.body)
    if (newPlace) {
      res.json({msg:'Place was created successfully', data: newPlace})
    }
    else {
      res.json({error: "Couldn't create new place"})
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
      const place = await Place.findById(req.params.id)
      if(!place) {
        return res.status(404).send({error: 'Place does not exist'})
      }
      const data = req.body
      const updatedPlace = await Place.findByIdAndUpdate({_id : id},data)
      res.json({msg: 'Place updated successfully'})
    }
    else {
      return res.status(400).json({ error: "not valid place id" })
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
      const deletedPlace = await Place.findByIdAndRemove(id)
      if (deletedPlace) {
        res.json({msg:'Place was deleted successfully', data: deletedPlace})
      }
      else {
        res.status(404).json({ msg: "Place is not found" })
      }
    }
    else {
      return res.status(400).json({ error: "not valid place id" })
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
      const u = await Place.findById(id);
      if(u)
        return res.json({ data: u });
      else
        return res.status(404).send({ msg: "Place is not found" });
    }
    else {
      return res.status(400).send({ error: "not valid place id" });
    }
  }
  catch (error) {
    console.log(error)
    res.json({error: error})
  }
})

module.exports = router