const router = require('express').Router();
const services = require('../controllers/services');


router.get("/getall",services.getAll)
router.get("/getall/:providerId",services.getAllProvider)

router.delete("/delete/:id",services.deleteService)

router.put("/update/:id",services.updateService)

router.post('/post/:providerId', services.postService);
router.put('/resUpdate')

module.exports=router