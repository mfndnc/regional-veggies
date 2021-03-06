require('dotenv/config');

// ******* for authentication
// npm install express-session connect-mongo bcrypt passport passport-local passport-facebook
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const User = require('../models/User');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/projector';

// ******* for authentication END
module.exports = (app) => {
  /*
   ******
   ****** saving sessions in local
   ******
   */

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      saveUninitialized: false,
      resave: true,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
      }),
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // this is used to retrieve the user by it's id (that is stored in the session)
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((dbUser) => {
        done(null, dbUser);
      })
      .catch((err) => {
        done(err);
      });
  });

  app.use(passport.initialize());
  app.use(passport.session());

  /*
   ******
   ******
   ******
   */
};
