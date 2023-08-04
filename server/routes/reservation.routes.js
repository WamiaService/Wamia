const express = require('express');
const router = express.Router();
const {  getAllRerservation,
    getOneRerservation}=require("../controllers/reservation")

router.get('/',getAllRerservation)
router.get('/getOne/:id', getOneRerservation)

module.exports = router;