const grantingMembership = require("../database/queries").grantingMembership;

const memberC = async (req, res) => {
  const { spword } = req.body;
  if (spword === "manishalka1234") {
    const { emailname } = req.user;
    req.user.status = true;
    await grantingMembership(emailname);
    res.redirect("/");
  } else {
    res.send("wrong secret password");
  }
};

module.exports = memberC;
