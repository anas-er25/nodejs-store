const express = require("express");
const app = express();
require("./database/config");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.APP_PORT, (req, res) => {
  console.log(`product-server is running on port ${process.env.APP_PORT}`);
});
