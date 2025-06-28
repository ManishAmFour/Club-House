const bcrypt = require("bcrypt");
const { validationResult, matchedData } = require("express-validator");
const savingTheUser = require("../models/queries").savingTheUser;
const grantingMembership = require("../models/queries").grantingMembership;
const signUpController = async (req, res) => {
  let isadmin = false;
  if (req.body.isadmin) {
    isadmin = true;
  }
  const errorMessages = validationResult(req);
  if (!errorMessages.isEmpty()) {
    res.render("signUp", {
      messages: "form fields are not correctly filled",
    });
  } else {
    const salt = 10;
    let { pword } = matchedData(req);
    const { fname } = req.body;
    const { lname } = req.body;
    const { emailName } = req.body;

    const savedPassword = bcrypt.hashSync(pword, salt);
    await savingTheUser(
      fname,
      lname,
      emailName,
      (pword = savedPassword),
      isadmin
    );
    if (isadmin) {
      await grantingMembership(emailName);
    }
    res.redirect("/log-in");
  }
};

module.exports = signUpController;
