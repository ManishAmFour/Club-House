const express = require("express");
const mainServer = express();
const signUp = require("./routes/signUp");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
mainServer.set("view engine", "ejs");
mainServer.set("views", path.join(__dirname, "views"));
mainServer.use(express.urlencoded());
mainServer.use(signUp);

mainServer.listen(3000);
