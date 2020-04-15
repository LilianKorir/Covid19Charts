// // Node's standard path module
// // See https://nodejs.org/api/path.html
'use strict';

let path = require('path');
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let express = require('express');

let app = express();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = app.get('env');
}

// Tell Express to load static files from the public/ directory
app.use(express.static(path.join(__dirname, 'public')));

app.inProduction = () => app.get('env') === 'production';
app.inDevelopment = () => app.get('env') === 'development';

if (app.inDevelopment()) {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'));
}

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Knex is a module used to generate SQL queries
// See http://knexjs.org/
let Knex = require('knex');

// Objection is a module used to represent and manipuldate
// data from a SQL database using JavaScript. It uses connect
// to generate the appropriate SQL queries.
// See https://vincit.github.io/objection.js/
let { Model } = require('objection');

// Tell Knex how to connect to our database
// See config/database.js
let dbConfig = require(app.root('knexfile'));
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);

app.use((req, res, next) => {
  next(createError(404));
});

let routes = require('./routes');
app.use('/', routes);
// Tell Express to log HTTP requests in the 'dev' format
// See the Morgan documentation for what that looks like
// app.use(logger('dev'));

let SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}...`);
  console.log('Visit this URL in your browser to see the web app:');
  console.log();
  console.log(`    http://localhost:${SERVER_PORT}`);
  console.log();
});

module.exports = app;
