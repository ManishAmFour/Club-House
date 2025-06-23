const express = require("express");
const LogOut = express.Router();

LogOut.get("/log-out", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = LogOut;
