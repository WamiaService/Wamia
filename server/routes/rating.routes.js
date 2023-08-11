const express = require('express');
const router = express.Router();

const {createRate,calculateAverage} = require('../controllers/rating')

router.post('/create/:providerId', createRate);
router.get('/calcul/:providerId',calculateAverage)

module.exports = router;