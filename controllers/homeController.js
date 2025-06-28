const extractingAllMessages =
  require("../models/queries").extractingAllMessages;

const homeController = async (req, res) => {
  //console.log(req.user);
  let name;
  let adminStatus;
  let status = false;
  if (req.user) {
    const { emailname } = req.user;
    const { isadmin } = req.user;
    adminStatus = isadmin;
    name = emailname;
    if (req.user.status === true || req.user.status === `true`) {
      status = true;
    }
  }
  const list = await extractingAllMessages();
  res.render("HomePage", {
    name: name,
    list: list,
    status: status,
    adminStatus: adminStatus,
  });
};

module.exports = homeController;
