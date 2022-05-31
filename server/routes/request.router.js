const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    const queryText = `
    SELECT "pending" FROM "connections"
    WHERE "user_A_id" = ${req.user.id}
    ;`;

    pool.query(queryText)
        .then((result) => {
            console.log('server GET connections', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('ERROR in GET connections', err);
            res.sendStatus(500)
        })
});
/**
 * GET route template
 */
router.get('/:idOfRequestedUser', (req, res) => {
    const queryText = `
    SELECT "pending", "relationship" FROM "connections"
    WHERE "user_A_id" = $1 AND
    "user_B_id" = $2
    ;`;

    const queryValues = [req.user.id, req.params.idOfRequestedUser];

    console.log('req', req.user.id, req.params.idOfRequestedUser)

    pool.query(queryText, queryValues)
        .then((result) => {
            console.log('server GET connections', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('ERROR in GET connections', err);
            res.sendStatus(500)
        })
});

module.exports = router;