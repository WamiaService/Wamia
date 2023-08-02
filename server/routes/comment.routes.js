const express = require('express');
const commentController = require('../controllers/comment')


const router = express.Router()

router.post("/comment/:idProvider",commentController.submitComment)

module.exports=router