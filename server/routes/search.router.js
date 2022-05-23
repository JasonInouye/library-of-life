const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT "id", "first_name", "last_name" FROM "users";
  `

  pool.query(queryText).then(result => {
      res.send(result.rows);
  }).catch(error => {
      console.log(error);
      res.sendStatus(500);
  })
});

router.get('/:searchedUser', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT * FROM "users"
    WHERE "id" = $1;
    `
  
    pool.query(queryText, [req.params.searchedUser]).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;