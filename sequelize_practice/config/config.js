require("dotenv").config();

const config = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.PASSWORD,
    "database": process.env.DB,
    "host": process.env.HOST,
    "dialect": process.env.DEALECT,
  },
};
module.exports = config;
