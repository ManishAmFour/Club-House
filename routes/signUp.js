const express = require("express");
const signUp = express.Router();
const signUpController = require("../controllers/signUpController");
const {
  matchedData,
  query,
  body,
  validationResult,
} = require("express-validator");

signUp.get("/sign-up", (req, res) => {
  if (req.user) {
    res.send(
      `
      <p>first log out to register new users</p>
      <a href="/log-out">Log out</a>
      `
    );
  } else {
    res.render("signUp", { messages: "please register" });
  }
});
signUp.post(
  "/sign-up",
  body("fname").notEmpty().withMessage("first name is empty"),
  body("lname").notEmpty().withMessage("last name is empty"),
  body("emailName").isEmail().withMessage("enter valid email"),
  body("pword")
    .notEmpty()
    .withMessage("cannot leave the password empty")
    .isLength({ min: 5, max: 20 })
    .withMessage("password not fits in the word limits"),

  async (req, res, next) => {
    const { pword } = matchedData(req);
    if (pword) {
      await body("cpword")
        .equals(pword)
        .withMessage("both passwords do not match")
        .run(req);
    }
    next();
  },
  signUpController
);

module.exports = signUp;
