const express = require("express");
const Router = express.Router();
const { intent,success } = require("../controllers/payment");

Router.post("/pay", intent);
Router.post("/success/:providerId",success)

module.exports = Router;
