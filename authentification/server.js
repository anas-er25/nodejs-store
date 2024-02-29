const express = require("express");
const app = express();
const authrouter = require("./routes/AuthRouters");
require("./database/config");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//Routes
app.use("/auth", authrouter);

app.listen(process.env.APP_PORT, (req, res) => {
  console.log(
    `authentification-server is running on port ${process.env.APP_PORT}`
  );
});
