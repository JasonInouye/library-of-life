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
router.get('/:id', (req, res) => {
  const query = `SELECT * FROM "videos" WHERE "id" = $1;`

  pool.query(query, [req.params.id])
    .then((results) => res.send(results.rows))
    .catch((err) => {
      console.log('Error in video GET', err);
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
