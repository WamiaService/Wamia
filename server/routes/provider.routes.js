const express = require('express');
const router = express.Router();
const {getAllProvider,getOneProvider,signupProvider,loginProvider} = require('../controllers/provider')


router.get('/', getAllProvider);
router.get('/getOne/:providerId', getOneProvider);
router.post('/signup', signupProvider);
router.post('/login', loginProvider);

module.exports = router;
