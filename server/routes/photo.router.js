const express = require('express');
const axios = require('axios');
const router = express.Router();
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
require('dotenv').config();

// GET S3 request URL from AWS
router.get('/', rejectUnauthenticated, async (req, res) => {
    //console.log('API S3 URL request');
    axios
        // endpoint is in env file
        .get(process.env.S3_PHOTO_API_URL)
        .then( (response) => {
            //console.log('this is the photo url', response.data);
            res.send(response.data)
        })
        .catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

// Update users profile with new profile image
router.put('/', (req, res) => {
    //console.log('this is the server user update', req.body);
    const domainLink = `https://d3mbwcp4a1lwx.cloudfront.net/${req.body.key}`
    const sqlText = `
      UPDATE "users"
      SET
        profile_image = $1
      WHERE id = $2
    ;`;
    pool.query(sqlText, [domainLink, req.user.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(`Error on User Update`, error);
        res.sendStatus(500)
      })
  });

module.exports = router;