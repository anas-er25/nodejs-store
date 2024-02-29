const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
index = async (req, res) => {
  res.render("index.ejs");
};

loginForm = async (req, res) => {
  const locals = {
    title: "Login",
  };

  res.render("login.ejs", { locals });
};
login = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            res.json({
              status: "SUCCESS",
              message: "User logged in successfully",
              data: user,
            });
          } else {
            res.json({
              status: "FAILED",
              message: "Invalid Password",
            });
          }
        });
      } else {
        res.json({
          status: "FAILED",
          message: "Invalid Email",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "User not found",
      });
    });
};

registerForm = async (req, res) => {
  const locals = {
    title: "Register",
  };

  res.render("register.ejs", { locals });
};
register = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.json({ message: "User already exists" });
  } else {
    bcrypt
      .hash(password, saltRounds)
      .then((hashedPassword) => {
        const user = new User({
          username,
          email,
          password: hashedPassword,
        });

        user
          .save()
          .then(() => {
            res.json({
              status: "SUCCESS",
              message: "User created successfully",
              data: user,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  res.redirect("/auth/login");
};

module.exports = { index, register, login, registerForm, loginForm };
