const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOSTNAME,
});

module.exports = pool;
