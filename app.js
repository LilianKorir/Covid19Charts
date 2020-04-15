// // Node's standard path module
// // See https://nodejs.org/api/path.html
let path = require('path');

// // The Express web application framework
// // See http://expressjs.com/
let express = require('express');

// // Library for nicer logging of HTTP requests
// // See https://github.com/expressjs/morgan
let logger = require('morgan');

let app = express();

// Tell Express to load static files from the public/ directory
app.use(express.static(path.join(__dirname, 'public')));

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
