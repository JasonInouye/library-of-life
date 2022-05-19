const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `
  SELECT "id", "first_name", "last_name" FROM "users";
  `

  pool.query(queryText).then(result => {
      console.log(result.rows)
      res.send(result.rows);
  }).catch(error => {
      console.log(error);
      res.sendStatus(500);
  })
});

router.get('/:searchedUser', (req, res) => {
    const queryText = `
    SELECT "id", "first_name", "last_name", "city", "state" FROM "users"
    WHERE "id" = $1;
    `
  
    pool.query(queryText, [req.params.searchedUser]).then(result => {
        console.log(result.rows)
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