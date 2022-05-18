const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const query = `SELECT * FROM "connections";`;

    pool.query(query)
    .then((result) => {
        res.send(result.rows);
    }).catch (err => {
        console.log('ERROR in GET connections', err);
        res.sendStatus(500)
    })
});

module.exports = router;