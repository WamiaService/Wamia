const express = require('express')
const ratingController = require('../controllers/rating')

const router=express.Router()

router.post('/rating/:idProvider',ratingController.submitRating)
module.exports = router