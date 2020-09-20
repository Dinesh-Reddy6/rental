//registering users(signup)
const bcrypt=require('bcrypt');
const _=require('lodash');
const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');       //using auth middleware(jwt)

router.get('/profile',auth,async (req,res)=>{       // *using auth middleware
     const user=await User.findById(req.user._id);    //we have user details in payload(req.user) 
                                                       //so no need to ask user for id
     res.send(user)                                   //.select('-password');
    });

router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     user=await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('user already exists');

    user=new User(
           _.pick(req.body,['name','email','password'])          //lodash
 )
      const salt=await bcrypt.genSalt(5);                          //hashing passwords
       user.password=await bcrypt.hash(user.password,salt);

    await user.save();
    res.send(_.pick(user,['name','email']))

    //we can login user and send token here or ask user to login again after registering
})

module.exports=router;
