const {validateGenre,Genre} =require('../models/genre')             
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const admin=require('../middleware/admin')     //middlewares
const auth=require('../middleware/auth')
const mongoose=require('mongoose')
const oid=require('../middleware/oid');
 
router.get('/',async (req, res) => {
  //throw new Error('thrown by me............')
  const genre=await Genre.find().sort('name');
  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id/:i',oid, async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  if(mongoose.Types.ObjectId.isValid(req.params.id)){
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  }

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id',[auth, admin,oid], async (req, res) => {
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
  const genre = await Genre.findByIdAndRemove(req.params.id);
  }
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

//router.get('/:id', oid,async (req, res) => {
  //if(mongoose.Types.ObjectId.isValid(req.params.id)){
//  const genre = await Genre.findById(req.params.id);
 // if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//  res.send(genre);
//}

module.exports = router; 