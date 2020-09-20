const Joi = require('joi');
const mongoose = require('mongoose');

//connection to db in index.js file only no need to write connection code in every file
const genreschema=new mongoose.Schema({     //schema and model
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})
const Genre = mongoose.model('Genre',genreschema );

  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre,schema);
  }

  exports.Genre=Genre;
  exports.validateGenre=validateGenre;
  exports.genreschema=genreschema;