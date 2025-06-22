const express = require("express");
const dashboard = express.Router();
const dashboardC = require("../controllers/dashboardC");

dashboard.get("/dashboard", (req, res) => {
  let emailname;
  if (req.user) {
    emailname = req.user.emailname;
  }
  res.render("dashboard", { emailname: emailname });
});

dashboard.post("/dashboard", dashboardC);

module.exports = dashboard;
