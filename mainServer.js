const express = require("express");
const session = require("express-session");
const mainServer = express();
const signUp = require("./routes/signUp");
const logIn = require("./routes/log-in");
const dashboard = require("./routes/dashboard");
const path = require("path");
const passport = require("passport");
const HomePage = require("./routes/homepage");

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
mainServer.use(dashboard);
mainServer.use(HomePage);

mainServer.listen(5342);
