const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT * FROM "shared_videos"
    JOIN "videos" ON "videos".id = "shared_videos".video_id
    WHERE "shared_videos".user_id = ${req.user.id};
    `

    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

router.post('/', rejectUnauthenticated, async (req, res) => {
    //loop over the data and make SQL statements
    const userIdArray = req.body.user_id;
    const videoId = req.body.video_id;

    // Set up continuous connection for all queries...
    const connection = await pool.connect()

    try {
        await connection.query('BEGIN');
        // TODO loop here 

        // const sqlText = `INSERT INTO "shared_videos" ("user_id", "video_id")
        // VALUES ($1, $2)`;

        for (const userID of userIdArray) {
            const sqlText = 
                `INSERT INTO "shared_videos" ("user_id", "video_id")
                VALUES (${userID}, ${videoId})`;
            await connection.query(sqlText)
        }


        await connection.query('COMMIT');
        res.sendStatus(200);
        
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back transfer`, error);
        res.sendStatus(500);
    } finally {
        // Always runs - both after successful try & after catch
        // Put the client connection back in the pool
        // This is super important! 
        connection.release()
    }

});



module.exports = router;