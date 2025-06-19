const express = require("express");
const session = require("express-session");
const mainServer = express();
const signUp = require("./routes/signUp");
const logIn = require("./routes/log-in");
const path = require("path");
const passport = require("passport");

mainServer.set("view engine", "ejs");
mainServer.set("views", path.join(__dirname, "views"));
mainServer.use(express.urlencoded());

require("dotenv").config();

mainServer.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

mainServer.use(passport.initialize());
mainServer.use(passport.session());

mainServer.use(signUp);
mainServer.use(logIn);

mainServer.listen(5342);
