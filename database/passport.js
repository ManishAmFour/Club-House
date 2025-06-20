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
  const { emailname } = user[0];

  const { status } = user[0];

  done(null, { emailname: emailname, status: status });
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
