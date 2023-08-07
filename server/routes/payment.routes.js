const express = require("express");
const Router = express.Router();
const {Add}=require ("../controllers/payment")

Router.post("/pay",Add)



module.exports = Router 