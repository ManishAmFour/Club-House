const express = require("express");
const logIn = express.Router();
const logInController = require("../controllers/logInController");

logIn.get("/log-in", logInController);

logIn.post("/log-in", (req, res) => {
  console.log("logged-in");
});

module.exports = logIn;
