const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  dogBreed: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 500
  },
});

module.exports = mongoose.model('Dog', schema);
