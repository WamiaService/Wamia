const router = require("express").Router();
const{
    getAllCustumor,
    getAllProviders,
    deleteCustumor,
    deleteProvider,
    getNpProviders,
    updateProvider
} = require("../controllers/admin")

router.get("/allcustumor",getAllCustumor);
router.get("/allprovider",getAllProviders);
router.delete("/deletecustumor/:custumorid",deleteCustumor);
router.delete("/deleteprovider/:providerid",deleteProvider);
router.get("/allnpProviders",getNpProviders);
router.put("/approveprovider/:id",updateProvider)

module.exports = router 