const passport = require("passport");
const accessingTheUser = require("./queries").accessingTheUser;
const LocalStrategy = require("passport-local").Strategy;

const customFields = { usernameField: "emailName", passwordField: "pword" };

passport.use(
  new LocalStrategy(customFields, async (emailName, pword, done) => {
    const user = await accessingTheUser(emailName, pword);

    if (user) {
      return done(null, user);
    }
    if (!user) {
      return done(null, false);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user[0].emailName);
});
passport.deserializeUser((user, done) => {
  done(null, user[0].emailName);
});

module.exports = passport;
