const express = require("express");
const HomePage = express.Router();
const homeController = require("../controllers/homeController");
const homeControllerP = require("../controllers/homeControllerP");

HomePage.get("/", homeController);

HomePage.post("/", homeControllerP);

module.exports = HomePage;
