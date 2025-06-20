const savingTheMessage = require("../database/queries").savingTheMessage;

const dashboardC = async (req, res) => {
  const { message } = req.body;
  await savingTheMessage(req.user, message);
};

module.exports = dashboardC;
