const express = require('express');
const router = express.Router();
const {  getAllRerservation,
    getOneRerservation,
    bookDate}=require("../controllers/reservation")

router.get('/',getAllRerservation)
router.get('/getOne/:id', getOneRerservation)
router.post('/book',bookDate)

module.exports = router;