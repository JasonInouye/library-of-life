const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * GET route for permissions of a user's videos
 */
router.get('/:video_id', (req, res) => {
  const query = `
    SELECT "permission" FROM "videos"
    WHERE "id" = $1; 
    `;

//console.log('get', req.params.video_id)
  pool.query(query, [req.params.video_id]).then((result) => {
    res.send(result.rows);
  }).catch(err => {
    console.log('ERROR: Get one treat', err);
    res.sendStatus(500)
  });
});

/**
 * GET route for SINGLE video
 */
router.put('/:video_id', rejectUnauthenticated, (req, res) => {
  const queryText = `
  UPDATE "videos"
  SET "permission" = $1
  WHERE "id" = $2;
  `
//console.log('put', req.body.permission, req.params.video_id)
  const values = [req.body.permission, req.params.video_id];

  pool.query(queryText, values).then(result => {
    res.sendStatus(200);
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
