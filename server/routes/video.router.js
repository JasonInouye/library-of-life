const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * GET route for ALL USER videos
 */
router.get('/userVideos/:id', (req, res) => {
    const query = `
    SELECT * FROM "videos"
    WHERE "user_id" = $1; 
    `;

    console.log('server GET userVideos', req.user.id)
    pool.query(query, [req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch(err => {
        console.log('ERROR: Get one treat', err);
        res.sendStatus(500)
    });
});

/**
 * GET route for SINGLE video
 */
 router.get('/', (req, res) => {
    // GET route code here
  });

/**
 * POST route template
 */
 router.post('/', (req, res) => {
  // POST route code here
  console.log( 'Inside of the VIDEO POST', req.body.key);
  const domainLink = `https://d2qw0j2prooaok.cloudfront.net/${req.body.key}`

  const sqlText =`
    INSERT INTO "videos" ("user_id", "prompt_id", "url")
    VALUES ($1, $2, $3)
    ;`;
  const insertValues = [req.user.id, 1, domainLink]

  pool.query(sqlText, insertValues)
    .then((result) => {
      console.log('Added to video table', insertValues);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log( 'error in VIDEO POST', err);
      res.sendStatus(500);
    });
});

module.exports = router;
