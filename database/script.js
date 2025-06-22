const pool = require("./connection");

async function configuringTheDatabase() {
  const command = `
CREATE TABLE IF NOT EXISTS users(
    fname VARCHAR(255),
    lname VARCHAR(255),
    emailName VARCHAR(255),
    pword VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS status(
    emailName VARCHAR(255),
    status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS astatus(
    emailName VARCHAR(255),
    status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS dashboard(
    emailName VARCHAR(255),
    messages VARCHAR(255),
    timestamp VARCHAR(255)   
);`;
  await pool.query(command);
}

configuringTheDatabase();
