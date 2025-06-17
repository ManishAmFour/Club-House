const bcrypt = require("bcrypt");
const { validationResult, matchedData } = require("express-validator");
const savingTheUser = require("../database/queries").savingTheUser;

const signUpController = async (req, res) => {
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
      (hash = salt)
    );
    res.redirect("/log-in");
  }
};

module.exports = signUpController;
