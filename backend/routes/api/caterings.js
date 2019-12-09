const express = require('express')
const router = express.Router()
const Catering = require('../../models/Catering')

router.get('/', async (req,res) => {
  try {
    const caterings = await Catering.find()
    res.json({data: caterings})
  }
  catch(error) {
    console.log(error)
    res.json({error: error})
  }
})

router.post('/', async (req,res) => {
  try {
    const newCatering = await Catering.create(req.body)
    if (newCatering) {
      res.json({msg:'Catering was created successfully', data: newCatering})
    }
    else {
      res.json({error: "Couldn't create new catering"})
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
      const catering = await Catering.findById(req.params.id)
      if(!catering) {
        return res.status(404).send({error: 'Catering does not exist'})
      }
      const data = req.body
      const updatedCatering = await Catering.findByIdAndUpdate({_id : id},data)
      res.json({msg: 'Catering updated successfully', data: updatedCatering})
    }
    else {
      return res.status(400).json({ error: "not valid catering id" })
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
      const deletedCatering = await Catering.findByIdAndRemove(id)
      if (deletedCatering) {
        res.json({msg:'Catering was deleted successfully', data: deletedCatering})
      }
      else {
        res.status(404).json({ msg: "Catering is not found" })
      }
    }
    else {
      return res.status(400).json({ error: "not valid catering id" })
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
      const u = await Catering.findById(id)
      if(u)
        return res.json({ data: u });
      else
        return res.status(404).json({ msg: "Catering is not found" })
    }
    else {
      return res.status(400).json({ error: "not valid catering id" })
    }
  }
  catch (error) {
    console.log(error)
    res.json({error: error})
  }
})

module.exports = router