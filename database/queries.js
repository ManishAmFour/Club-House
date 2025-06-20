const pool = require("./connection");
const bcrypt = require("bcrypt");

const savingTheMessage = async (emailName, message) => {
  const timestamp = Date.now();

  const command = `
INSERT INTO dashboard(emailName,messages,timestamp)
VALUES($1,$2,$3);
`;

  await pool.query(command, [emailName, message, timestamp]);
};

const extractingAllMessages = async () => {
  const command = `
  SELECT users.emailName,dashboard.messages 
  FROM users 
  INNER JOIN dashboard ON
  users.emailName = dashboard.emailName
  ;`;
  const { rows } = await pool.query(command);
  return rows;
};

const savingTheUser = async (fname, lname, emailName, pword) => {
  const command = `INSERT INTO users (fname, lname, emailName, pword)
VALUES ($1,$2,$3,$4);
`;

  const command2 = `
INSERT INTO status(emailName,status)
VALUES($1,$2)
`;

  const command3 = `
INSERT INTO dashboard(emailName)
VALUES($1)
`;

  await pool.query(command, [fname, lname, emailName, pword]);
  await pool.query(command2, [emailName, false]);
  await pool.query(command3, [emailName]);
};

const accessingTheUser = async (emailName, password) => {
  const commmand = `SELECT users.pword, users.emailName,status.status
  FROM users 
  INNER JOIN status ON users.emailName = status.emailName
  WHERE users.emailName = ($1);
  `;

  const { rows } = await pool.query(commmand, [emailName]);
  const { pword } = rows[0];

  const confirmPass = await bcrypt.compare(password, pword);
  if (confirmPass) {
    return rows;
  } else {
    return "user not found";
  }
};

module.exports = {
  extractingAllMessages,
  savingTheUser,
  accessingTheUser,
  savingTheMessage,
};
