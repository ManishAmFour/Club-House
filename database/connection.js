const { Pool } = require("pg");

const pool = new Pool({
  database: "clubhouse",
  user: "manish-tewatia",
  password: "manishalka1234",
  host: "localhost",
});

module.exports = pool;
