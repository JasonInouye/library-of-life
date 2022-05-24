const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    const queryText = `
        INSERT INTO "shared_videos" ("user_id", "video_id")
        VALUES ($1, $2)
  ;`

    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
});



module.exports = router;