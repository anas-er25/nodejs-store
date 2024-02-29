const express = require("express");
const Product = require("../models/Product");

index = async (req, res) => {
    const locals = {
        title: "Product List",
    }
    const products = await Product.find();
    res.render("index", { products, locals });
}


module.exports = { 
    index,

}