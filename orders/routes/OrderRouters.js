const express = require("express");
const { index, add, destroy } = require("../controllers/orderController");
const orderrouter = express.Router();

orderrouter.get("/", index);
orderrouter.post("/add", add);
orderrouter.delete("/:userId/:productId", destroy);

module.exports = orderrouter;
