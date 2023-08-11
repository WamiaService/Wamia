const express = require("express");
const Router = express.Router();
const {Add}=require ("../controllers/payment")
const {Verify}=require("../controllers/payment")
Router.post("/pay",Add)
Router.post("/pay/:id",Verify)



module.exports = Router 