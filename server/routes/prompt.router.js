const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


/**
 * GET route for video prompts
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
    SELECT
     "id",
     "prompt"
    FROM "prompts"
    ;`;
    pool.query(query)
    .then((result) => {
        res.send(result.rows);
        console.log('server GET prompts', result.rows)
    }).catch(err => {
        console.log('ERROR: Get prompts', err);
        res.sendStatus(500)
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
