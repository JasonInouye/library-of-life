const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

//get connections from DB 
router.get('/', (req, res) => {
    const queryText = `
    SELECT 
    b.first_name,
    b.last_name,
    b.profile_image,
    b.id,
    a.relationship,
    a.pending,
    a."user_A_id",
    a."user_B_id"
    FROM "connections" a, "users" b
    WHERE (a."user_A_id" = $1
    and a."user_B_id" = b."id") OR (a."user_B_id" = $2
    and a."user_A_id" = b."id") 
    ;`;
    // can refactor to one req.user.id
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

router.post('/', (req, res) => {

    console.log(req.body.relationship, req.user.id, req.body.userB)


    const queryText = `
    INSERT INTO "connections" ("relationship", "user_A_id", "user_B_id")
    VALUES ($1, $2, $3);
    `

    const values = [req.body.relationship, req.user.id, req.body.userB];

    pool.query(queryText, values).then(result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })

});

router.put('/:id', (req, res) => {
    const id = req.params.id; 

    const queryText = `
    UPDATE "connections" 
    SET "pending" = false
    WHERE id = $1;`;

    queryValues = [id]

    pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(200); })
    .catch((err) => {
        console.log('ERROR in PUT connections', err);
        res.sendStatus(500);
    })
});

//Delete connection from connections table
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id; 

    console.log(id);

    const queryText = `DELETE FROM "connections" WHERE id = $1;`;

    const queryValues = [id]

    pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(200); })
    .catch((err) => {
        console.log('ERROR in DELETE connections', err);
        res.sendStatus(500);
    })
});

module.exports = router;