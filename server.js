const mongoose = require('mongoose');
// const app = require('./lib/app');

mongoose.connect('mongodb://localhost:27017/dogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
