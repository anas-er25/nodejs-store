const express = require("express");
const orderrouter = express.Router();

orderrouter.get("/", (req, res, next) => {
    res.send("Orders Page");
});

module.exports = orderrouter;
