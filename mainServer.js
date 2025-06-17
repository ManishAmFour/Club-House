const express = require("express");
const session = require("express-session");
const mainServer = express();
const signUp = require("./routes/signUp");
const logIn = require("./routes/log-in");
const path = require("path");
const accessingTheUser = require("./database/queries").accessingTheUser;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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

passport.use(
  new LocalStrategy(async (emailName, pword, done) => {
    const user = await accessingTheUser(emailName, pword);
    if (user) {
      return done(null, user);
    }
    if (!user) {
      return done(null, false);
    }
  })
);

mainServer.use(signUp);
mainServer.use(logIn);

mainServer.listen(3000);
