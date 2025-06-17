const pool = require("./connection");

const savingTheUser = async (fname, lname, emailName, pword, hash) => {
  const command = `INSERT INTO users (fname, lname, emailName, pword, hash)
VALUES ($1,$2,$3,$4,$5);
`;

  const command2 = `
INSERT INTO status(emailName,status)
VALUES($1,$2)
`;

  const command3 = `
INSERT INTO dashboard(emailName)
VALUES($1)
`;

  await pool.query(command, [fname, lname, emailName, pword, hash]);
  await pool.query(command2, [emailName, false]);
  await pool.query(command3, [emailName]);
};

const accessingTheUser = async (emailName, pword) => {
  const commmand = `SELECT * FROM users WHERE emailName IN ($1) AND pword IN ($2)`;

  const { rows } = await pool.query(commmand, { emailName, pword });
  return rows;
};

module.exports = { savingTheUser, accessingTheUser };
