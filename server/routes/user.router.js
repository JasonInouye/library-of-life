const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  
  // console.log('This is the user data', req.user);
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', rejectUnauthenticated, (req, res, next) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "users" (username, first_name, last_name, city, state, country, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;

  const queryValues = [username, firstName, lastName, city, state, country, password]

  console.log( 'POST LOG', queryText, queryValues)
  
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(201)})
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
