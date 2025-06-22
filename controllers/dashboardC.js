const savingTheMessage = require("../database/queries").savingTheMessage;

const dashboardC = async (req, res) => {
  const { message } = req.body;
  const { emailname } = req.user;
  await savingTheMessage(emailname, message);
};

module.exports = dashboardC;
