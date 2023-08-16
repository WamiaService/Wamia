const express = require("express");
const Router = express.Router();
const { intent } = require("../controllers/payment");

Router.post("/pay", intent);

module.exports = Router;
