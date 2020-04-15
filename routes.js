'use strict';
let express = require('express');
let router = express.Router();
// let controller = require('./controllers') //if you want to use 'router.get(/ controller.main)'

router.get('/', function(req, res) {
  let usState = getelementById('n1').value
  res.render('index') //anything within the public folder
});

router.get('/state', function(req, res) {
  res.send('HELLO WORLD')
  res.render('index') //anything within the public folder
})

router.get('/state/:usState', function(req, res) {
  res.send(' '+ req.param.usState +' data')
  res.render('index') //anything within the public folder
})

module.exports = router;
