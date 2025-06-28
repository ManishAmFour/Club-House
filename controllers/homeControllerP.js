const deletingTheMessaage = require("../models/queries").deletingTheMessaage;

const homeControllerP = async (req, res) => {
  const emailName = Object.entries(req.body)[0][0];

  await deletingTheMessaage(emailName);
  res.redirect("/");
};
module.exports = homeControllerP;
