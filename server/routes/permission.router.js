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
 * GET route for ALL permissions of a user's videos
 */
router.get('/:id', (req, res) => {
    const query = `
    SELECT * FROM "shared_videos"
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
});

module.exports = router;
