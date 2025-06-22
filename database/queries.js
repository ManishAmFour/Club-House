const pool = require("./connection");
const bcrypt = require("bcrypt");

const savingTheMessage = async (emailName, message) => {
  const timestamp = Date.now();

  const command = `UPDATE dashboard
SET messages = ($2),timestamp = ($3)
WHERE emailName = ($1);
`;

  await pool.query(command, [emailName, message, timestamp]);
};

const grantingMembership = async (emailName) => {
  const command = `UPDATE status
SET status = ($1)
WHERE emailName = ($2);
`;
  await pool.query(command, [true, emailName]);
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

const savingTheUser = async (fname, lname, emailName, pword, isadmin) => {
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

  const command4 = `
INSERT INTO astatus(emailName,status)
VALUES($1,$2)
`;

  await pool.query(command, [fname, lname, emailName, pword]);
  await pool.query(command2, [emailName, false]);
  await pool.query(command3, [emailName]);
  await pool.query(command4, [emailName, isadmin]);
};

const accessingTheUser = async (emailName, password) => {
  const commmand = `SELECT first_name.pword,first_name.emailName,first_name.status,astatus.status AS isadmin FROM(SELECT users.pword, users.emailName,status.status
  FROM users 
  INNER JOIN status ON users.emailName = status.emailName
  WHERE users.emailName = ($1)) AS first_name INNER JOIN astatus ON astatus.emailName = first_name.emailName;
  `;

  const { rows } = await pool.query(commmand, [emailName]);
  if (!rows[0]) {
    return undefined;
  }

  const { pword } = rows[0];

  const confirmPass = await bcrypt.compare(password, pword);
  if (confirmPass) {
    return rows;
  } else {
    return "user not found";
  }
};

module.exports = {
  grantingMembership,
  extractingAllMessages,
  savingTheUser,
  accessingTheUser,
  savingTheMessage,
};
