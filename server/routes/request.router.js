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
 * POST route template
 */
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

module.exports = router;