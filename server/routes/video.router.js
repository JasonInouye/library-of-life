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
    SELECT a.*, c.prompt 
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
    router.get('/:id', (req, res) => {
        const query = `SELECT * FROM "videos" WHERE "id" = $1;`

        pool.query(query, [req.params.id])
            .then((results) => res.send(results.rows))
            .catch((err) => {
                console.log('Error in video GET', err);
            })
    })
});


    /**
     * DELETE route for SINGLE video
     */
     router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('router DELETE id:', id);
    const query = `DELETE FROM "videos" WHERE "videos".id =$1;`;
    values = [id];
    pool.query(query, values)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing DELETE', err);
            res.sendStatus(500);
        });
});


/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
