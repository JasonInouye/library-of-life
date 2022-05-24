const express = require('express');
const axios = require('axios');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// router.get('/image', rejectUnauthenticated, async (req, res) => {
//     // GET route code here
//     let mediaType = '.jpeg';
//     const url = await s3Url(mediaType);
//     res.send({url})
// });

router.get('/', rejectUnauthenticated, async (req, res) => {
    console.log('API S3 URL request');
    const API_ENDPOINT ='https://hfoxt7tc91.execute-api.us-east-1.amazonaws.com/default/getPresignedVideoURL2';
    axios
        .get(API_ENDPOINT)
        .then( (response) => {
            console.log(response.data);
            res.send(response.data)
        })
        .catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;