//const jwt=require('jsonwebtoken');      //in payload we need user details therefore,setting it here only
//const config=require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
     },
    email:{
        type:String,
       required: true,
       trim: true, 
       minlength: 5,
       maxlength: 255,
       unique:true
    },
    password:{
        type:String,
       required: true,
       minlength: 5,
       maxlength: 1024
    },
    
    isAdmin: Boolean
})

const User= mongoose.model('User',userschema)

//it is a method of user object
//userschema.methods.generateAuthToken = function(){             //generating token and creating payload
 //   const token=jwt.sign({_id:this._id},config.get('jwtPrimaryKey'));
  //  return token;
//}

function validateUser(user){
    const Schema={
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(user,Schema)
}

exports.User=User;
exports.validate=validateUser;
