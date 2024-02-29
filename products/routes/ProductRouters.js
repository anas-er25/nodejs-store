const express = require("express");
const { index } = require("../conrollers/productController");
const productrouter = express.Router();

productrouter.get("/", index);

module.exports = productrouter;
