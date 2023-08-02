const router = require('express').Router();
const services = require('../controllers/services');


router.get("/getall",services.getAll)
router.get("/getall/:idProvider",services.getAllProvider)

router.delete("/delete/:idservices",services.deleteService)

router.put("/update/:idservices",services.updateService)

router.post('/post', services.postService);

module.exports=router