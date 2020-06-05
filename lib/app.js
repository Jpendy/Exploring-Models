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

app.get('/dogs/:id', (req, res) => {
  Dog 
    .findById(req.params.id)
    .then(dog => res.send(dog));
});



app.patch('/dogs/:id', (req, res) => {
  Dog
    .findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true } 
    )
    .then(dog => res.send(dog));
});

app.delete('/dogs/:id', (req, res) => {
  Dog
    .findByIdAndDelete(req.params.id)
    .then(dog => res.send(dog));
});


module.exports = app;
