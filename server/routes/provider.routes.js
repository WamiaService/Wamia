const express = require('express');
const router = express.Router();

const {getAllProvider,verifyProvider,getOneProvider,signupProvider,loginProvider} = require('../controllers/provider')



router.put("/update/:idprovider",updateProvider)
router.get('/', getAllProvider);
router.get('/getOne/:providerId', getOneProvider);
router.post('/signup', signupProvider);
router.post('/login', loginProvider);
router.post('/verify/:activationcode',verifyProvider)
module.exports = router;

