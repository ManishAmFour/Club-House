const deletingTheMessaage = require("../database/queries").deletingTheMessaage;

const homeControllerP = async (req, res) => {
  const { emailName } = req.body;
  console.log(emailName);
  await deletingTheMessaage(emailName);
  res.redirect("/");
};
module.exports = homeControllerP;
