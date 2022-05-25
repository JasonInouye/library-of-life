const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {
    console.log('banner router data:', req.body);
    
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
    

module.exports = router;