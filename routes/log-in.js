const express = require("express");
const logIn = express.Router();
const logInController = require("../controllers/logInController");
const passport = require("../database/passport");

logIn.get("/log-in", (req, res) => {
  res.render("log-in");
});

logIn.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/log-in",
    failureRedirect: "/sign-up",
  }),
  logInController
);

module.exports = logIn;
