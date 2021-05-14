// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// move all passports configuration to /config/
// **** using one file per Strategy to make it more readable
require('./config/passport.local')(app);
require('./config/passport')(app);
// end of passport configuration

// 👇 Start handling routes here
// Contrary to the views version, all routes are controled from the routes/index.js

require('./config/routes')(app);

if (process.env.ENVLOCAL && process.env.ENVLOCAL === 'local') {
  console.log('local app');
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
} else {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.use((req, res) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + '/client/build/index.html');
  });
}

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
