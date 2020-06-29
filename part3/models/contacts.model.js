const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const contactSchema = new mongoose.Schema({
  name: { 
    type:String,
    minlength: 3,
    required:true,
    unique: true
  },
  number: {
    type:Number,
    min: 9999999,
    required:true,
  }
})

contactSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

contactSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Contact', contactSchema)