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
    SELECT a."url", c."prompt" 
    FROM "videos" a, "users" b, "prompts" c
    WHERE a."user_id" = b."id"
    AND b."id" = $1
    AND c."id" = a."prompt_id"
; 
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
