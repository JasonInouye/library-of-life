const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.put('/', (req, res) => {
    // console.log('banner router data:', req.body.banner);

    const queryText = `
        UPDATE "users" 
        SET "banner_image" = $1
        WHERE "id" = ${req.user.id}
    ;`;

    pool.query(queryText, [req.body.banner])
        .then((result) => {
            // console.log('server GET connections', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('ERROR in GET connections', err);
            res.sendStatus(500)
        })
});


module.exports = router;