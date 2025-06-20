const express = require("express");
const dashboard = express.Router();
const dashboardC = require("../controllers/dashboardC");

dashboard.get("/dashboard", (req, res) => {
  res.render("dashboard", { emailName: req.user });
});

dashboard.post("/dashboard", dashboardC);

module.exports = dashboard;
