const express = require("express");
const member = express.Router();
const memberC = require("../controllers/memberC");

member.get("/member", (req, res) => {
  if (req.user) {
    res.render("member");
  } else {
    res.send("please log in first to become a member");
  }
});

member.post("/member", memberC);

module.exports = member;
