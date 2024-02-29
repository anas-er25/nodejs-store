const express = require("express");
const app = express();
const orderrouter = require("./routes/OrderRouters");
const methodOverride = require("method-override");
require("./database/config");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//Routes
app.use("/", orderrouter);

app.listen(process.env.APP_PORT, (req, res) => {
  console.log(`orders-server is running on port ${process.env.APP_PORT}`);
});
