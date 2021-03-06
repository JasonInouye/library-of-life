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
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const password = encryptLib.encryptPassword(req.body.password);



  
  const queryText = `INSERT INTO "users" (username, first_name, last_name, city, state, country, password, profile_image, banner_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`;

  const queryValues = [username, firstName, lastName, city, state, country, password, './images/people/blankProfile.png', './images/banners/paper.png']

  //console.log( 'POST LOG', queryText, queryValues)
  
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

// clear all server session information about this user
router.put('/update/:id', (req, res) => {
  //console.log('this is the server user update', req.body);
  const idToUpdate = req.params.id;
  const sqlText = `
    UPDATE "users"
    SET
      first_name = $1,
      last_name = $2,
      city = $3,
      state = $4,
      country = $5
    WHERE id = $6
  ;`;
  pool.query(sqlText, [req.body.firstName, req.body.lastName, req.body.city, req.body.state, req.body.country, idToUpdate])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error on User Update`, error);
      res.sendStatus(500)
    })
});

module.exports = router;
