const mongoose = require('mongoose');

module.exports = mongoose.model('todos', {

   text: String,
   isCompleted:Boolean

});