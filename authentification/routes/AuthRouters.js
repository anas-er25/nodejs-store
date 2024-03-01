const express = require("express");
const { index, login, register, registerForm, loginForm } = require("../controllers/Authcontroller");
const authrouter = express.Router();

authrouter.get("/", index);

authrouter.get("/login", loginForm);
authrouter.post("/login", login);

authrouter.get("/register", registerForm);
authrouter.post("/register", register);
module.exports = authrouter;
