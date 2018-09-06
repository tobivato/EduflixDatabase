const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  url: String,
  message: String

});

module.exports = mongoose.model('Movie', movieSchema);
