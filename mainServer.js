const express = require("express");
const session = require("express-session");
const mainServer = express();
const signUp = require("./routes/signUp");
const logIn = require("./routes/log-in");
const dashboard = require("./routes/dashboard");
const path = require("path");
const passport = require("passport");
const HomePage = require("./routes/homepage");
const member = require("./routes/member");
const LogOut = require("./routes/LogOut");
require("dotenv").config();
const port = process.env.PORT || 4000;

mainServer.set("view engine", "ejs");
mainServer.set("views", path.join(__dirname, "views"));
mainServer.use(express.static("styles"));

require("dotenv").config();
mainServer.use(express.json());
mainServer.use(express.urlencoded());

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

mainServer.use(member);
mainServer.use(signUp);
mainServer.use(logIn);
mainServer.use(dashboard);
mainServer.use(HomePage);
mainServer.use(LogOut);

mainServer.listen(port);
