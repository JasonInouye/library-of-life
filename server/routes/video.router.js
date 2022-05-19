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
 * GET route for ALL USER videos and their prompts
 */
router.get('/userVideos/:id', (req, res) => {
    const query = `
    SELECT "videos".url, "prompts".prompt
FROM "videos" JOIN "prompts"
ON "videos"."user_id" = "prompts"."user_id"
WHERE "videos"."user_id" = $1; 
    `;

    console.log('server GET userVideos and prompts', req.user.id)
    pool.query(query, [req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch(err => {
        console.log('ERROR: Get video URLs and prompts,', err);
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
