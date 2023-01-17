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

let connectionFunctions = {
  close: () => {
    return new Promise((resolve, reject) => {
      connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  fetchAllJourneyData: () => {
    return new Promise((resolve, reject) => {
      connection.query("select * from journey_data", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  fetchAllStationData: () => {
    return new Promise((resolve, reject) => {
      connection.query("select * from stations", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
};

module.exports = connectionFunctions;
