const mysql = require("mysql");
require("dotenv").config();

let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  connectionLimit: 10,
};

const connection = mysql.createPool(config);
