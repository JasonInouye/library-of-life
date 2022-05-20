const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get connections from DB 
router.get('/', (req, res) => {
    const queryText = `
    SELECT 
    b.first_name,
    b.last_name,
    b.profile_image,
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

//Delete connection from connections table
router.delete('/:id', (req, res) => {
    const id = req.params.id; 

    const queryText = `DELETE FROM "connections" where id = $1;`;

    queryValues = [id]

    pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(200); })
    .catch((err) => {
        console.log('ERROR in DELETE connections', err);
        res.sendStatus(500);
    })
});

module.exports = router;