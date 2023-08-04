const express = require('express');
const router = express.Router();
const {getAllcustumor,getOnecustumor,logincustumor,signupcustumor, updateCustumor} = require('../controllers/custumor')


router.get('/', getAllcustumor);
router.get('/getOne/:custumorId', getOnecustumor);
router.post('/signup', signupcustumor);
router.post('/login', logincustumor);
router.put('/update/:id',updateCustumor)

module.exports = router;