const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `
  SELECT "id", "first_name", "last_name" FROM "users";
  `

    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.get('/:searchedUser', (req, res) => {
    const queryText = `
    SELECT "id", "first_name", "last_name", "city", "state", "country", "username", 
"about_me", "banner_image", "profile_image" FROM "users"
WHERE "id" = $1;
`

    //console.log(req.params.searchedUser)
    pool.query(queryText, [req.params.searchedUser]).then(result => {
        console.log(result.rows)
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

router.get('/videos/:searchedUser', (req, res) => {
    const queryText = `
    SELECT * FROM "videos"
    WHERE "user_id" = $1;
`

    const values = [req.params.searchedUser]

    //console.log(req.params.searchedUser)
    pool.query(queryText, values).then(result => {
        //console.log(result.rows)
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;