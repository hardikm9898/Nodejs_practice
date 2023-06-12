const mySql = require("mysql2");
require("dotenv").config()

const conncet = mySql.createPool({
  host: process.env.HOST,
  user:process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});

module.exports = conncet.promise();
