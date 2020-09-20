const error = require('./middleware/error')       //middleware for errors

require('express-async-errors')       //no need to write try catch blocks, it writes for all routes
//try{
//   route code  
//}
//catch(err){ 
//  next(err);    //passing errors to err mw func //if err occurs in any mw func it is passed to err mw   
//   }

const winston=require('winston')        //for logging errors
//winston.add(new winston.transports.File,{filename:'logfile.log'});
const logger = winston.createLogger({
  transports: [
   new winston.transports.Console(),
    new winston.transports.File({ filename: 'logger.log' })
  ]
});
winston.add(logger);              //to log msg to file

const config=require('config')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi)      //object id validation using npm package

const genres = require('./routes/genres');             //routes
const customers = require('./routes/customers');
const movies =require('./routes/movies')
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth=require('./routes/auth');   //for login

if(!config.get('jwtPrimaryKey')){                            //checking if env varible is set
  console.error('fatal error:set all env variables first(jwt)')
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly',{ useFindAndModify: false })       //db coonection.
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());                      //mw  express->[routes]->error
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);           //if error in any route.. next(ex) i.e goes to error midleware func
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error)           //mw to handle errors

//Handling errors that occur outside req process pipeline i.e anywhere in node process
 
process.on('uncaughtException',(ex)=>{           //for sync errors
  console.log('got uncaught exception......')
  console.log(ex);
  winston.error(ex.message,ex);
})

process.on('unhandledRejection',(ex)=>{          //for aync errors
  console.log('got uncaught exception......')
  console.log(ex)
  winston.error(ex.message,ex);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

