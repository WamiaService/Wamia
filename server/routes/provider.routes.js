const express = require('express');
const router = express.Router();
const {getAllProvider,getOneProvider,signupProvider,loginProvider,updateProvider} = require('../controllers/provider')

router.put("/update/:idprovider",updateProvider)
router.get('/', getAllProvider);
router.get('/getOne/:providerId', getOneProvider);
router.post('/signup', signupProvider);
router.post('/login', loginProvider);

module.exports = router;

