const express = require("express");
const signUp = express.Router();
const signUpController = require("../controllers/signUpController");
signUp.get("/sign-up", signUpController);

module.exports = signUp;
