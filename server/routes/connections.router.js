const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get connections from DB 
router.get('/', (req, res) => {
    const queryText = `
    SELECT 
    b.first_name,
    b.last_name,
    a.relationship
    FROM "connections" a, "users" b
    WHERE (a."user_A_id" = $1
    and a."user_B_id" = b."id") OR (a."user_B_id" = $2
    and a."user_A_id" = b."id") 
    ;`;

    const queryValues = [req.user.id, req.user.id];

    pool.query(queryText, queryValues)
    .then((result) => {
        console.log('server GET connections', result.rows);
        res.send(result.rows);
    }).catch (err => {
        console.log('ERROR in GET connections', err);
        res.sendStatus(500)
    })
});

module.exports = router;