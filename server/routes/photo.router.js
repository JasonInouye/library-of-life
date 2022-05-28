const express = require('express');
const axios = require('axios');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
require('dotenv').config();

router.get('/', rejectUnauthenticated, async (req, res) => {
    console.log('API S3 URL request');
    axios
        // endpoint is in env file
        .get(process.env.S3_PHOTO_API_URL)
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