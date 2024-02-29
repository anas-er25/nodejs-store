const express = require("express");
const app = express();
const productrouter = require("./routes/ProductRouters");
require("./database/config");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//Routes
app.use("/", productrouter);

app.listen(process.env.APP_PORT, (req, res) => {
  console.log(`products-server is running on port ${process.env.APP_PORT}`);
});
