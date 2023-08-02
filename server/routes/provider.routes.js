const router = require('express').Router();
const provider = require('../controllers/provider');



router.put("/update/:idprovider",provider.updateProvider)


module.exports=router