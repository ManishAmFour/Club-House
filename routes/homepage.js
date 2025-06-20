const express = require("express");
const HomePage = express.Router();
const homeController = require("../controllers/homeController");

HomePage.get("/", homeController);

module.exports = HomePage;
