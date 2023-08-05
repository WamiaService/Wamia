const express = require('express');
const router = express.Router();
const {getAllcustumor,getOnecustumor,logincustumor,signupcustumor} = require('../controllers/custumor')


router.get('/', getAllcustumor);
router.get('/getOne/:custumorId', getOnecustumor);
router.post('/signup', signupcustumor);
router.post('/login', logincustumor);

module.exports = router;