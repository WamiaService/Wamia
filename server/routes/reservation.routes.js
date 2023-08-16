const express = require('express');
const router = express.Router();
const {  getAllRerservation,
    getOneRerservation,
    bookDate,getAllProvider,updateReservationStatus}=require("../controllers/reservation")

router.get('/',getAllRerservation)
router.get('/getOne/:id', getOneRerservation)
router.post('/book/:providerId',bookDate)
router.get('/ProvReservation/:providerId',getAllProvider)
router.put('/resUpdate/:id',updateReservationStatus)
module.exports = router;