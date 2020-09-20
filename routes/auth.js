//for login (jwt used)
const jwt=require('jsonwebtoken');     
const config=require('config');
const { User} = require('../models/user');

const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const bcrypt=require('bcrypt');
const Joi = require('joi');

function validate(input){       // JOI schema for login
    const Schema={
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(input,Schema)
}


router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('invalid email or password');

    const result=bcrypt.compare(user.password,req.body.password);
    if(!result) return res.status(400).send('invalid email or password');
   
    //generating token when user logged in
    const token = jwt.sign({_id:user._id,name:user.name,isAdmin:user.isAdmin},config.get('jwtPrimaryKey'));
    res.header('x-auth-token',token).send('logged in... token sent in header...' );
})

module.exports=router;