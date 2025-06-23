const express = require("express");
const logIn = express.Router();
const passport = require("../database/passport");

logIn.get("/log-in", (req, res) => {
  if (req.user) {
    res.send(`
      <p>you're already logged in</p>
      <a href="/log-out">Log out</a>
      `);
  } else {
    res.render("log-in");
  }
});

logIn.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-up",
  })
);

module.exports = logIn;
