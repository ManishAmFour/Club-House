const bcrypt = require("bcrypt");
const { validationResult, matchedData } = require("express-validator");

const signUpController = async (req, res) => {
  const errorMessages = validationResult(req);
  if (!errorMessages.isEmpty()) {
    res.render("signUp", {
      messages: "form fields are not correctly filled",
    });
  } else {
    const salt = 10;
    const { pword } = matchedData(req);
    const savedPassword = bcrypt.hashSync(pword, salt);
    console.log(savedPassword);
  }
};

module.exports = signUpController;
