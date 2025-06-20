const { authenticate } = require("passport");

const extractingAllMessages =
  require("../database/queries").extractingAllMessages;

const homeController = async (req, res) => {
  let status = false;

  if (req.user) {
    if (req.user.status === true) {
      status = true;
    }
  }

  const list = await extractingAllMessages();
  console.log(list);
  res.render("HomePage", { list: list, status: status });
};

module.exports = homeController;
