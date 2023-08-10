const express = require('express');
const router = express.Router();
const {getAllProvider,verifyProvider,getOneProvider,signupProvider,loginProvider, searchProviders,updateProvider} = require('../controllers/provider')


router.get('/', getAllProvider);
router.get('/getOne/:providerId', getOneProvider);
router.post('/signup', signupProvider);
router.post('/login', loginProvider);
router.post('/verify/:activationcode',verifyProvider)
router.get('/search', searchProviders);
router.put("/update/:id",updateProvider)
module.exports = router;
