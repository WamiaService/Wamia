const express = require('express');
const router = express.Router();

const {createReview,getAllReview} = require('../controllers/review')


router.post('/create/:providerId', createReview);
router.get('/getAll/:providerId',getAllReview)

module.exports = router;