
const express = require('express');
const app = express();

const Dog = require('./models/dog');

app.use(require('cors')());
app.use(express.json());

app.post('/dogs', (req, res) => {
  Dog
    .create(req.body)
    .then(dog => res.send(dog));
});

app.get('/dogs', (req, res) => {
  Dog
    .find()
    .then(dogs => res.send(dogs));
});



module.exports = app;
