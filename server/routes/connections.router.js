const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get connections from DB 
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "connections" a, "users" b
    WHERE a."user_B_id" = b."id";`;

    pool.query(queryText)
    .then((result) => {
        console.log('server GET connections', result.rows);
        res.send(result.rows);
    }).catch (err => {
        console.log('ERROR in GET connections', err);
        res.sendStatus(500)
    })
});

module.exports = router;