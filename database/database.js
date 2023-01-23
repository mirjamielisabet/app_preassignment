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

  fetchAllStationNames: () => {
    return new Promise((resolve, reject) => {
      connection.query("select name, id from stations", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  fetchStationData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "select name, osoite, kapasiteetti from stations where id = ?",
        id,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  },

  fetchJourneyStartCount: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "select count(*) as startCount from journey_data where departure_station_id = ?",
        id,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  },

  fetchJourneyEndCount: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "select count(*) as endCount from journey_data where return_station_id = ?",
        id,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  },
};

module.exports = connectionFunctions;
