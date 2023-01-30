const mysql = require("mysql");
require("dotenv").config();

/**
 * @type {Object}
 * @property {string} host - the database host
 * @property {string} user - the username of the database user
 * @property {string} password - the password of the database user
 * @property {string} database - the name of the database
 * @property {number} connectionLimit - the maximum number of connections to create at once
 */
let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  connectionLimit: 10,
};

/**
 * Create a connection pool.
 */
const connection = mysql.createPool(config);

/**
 * MySQL connection functions.
 * @module database/database
 */
let connectionFunctions = {
  /**
   * A connection function for closing the connection.
   * @returns {Promise}
   */
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

  /**
   * A connection function for fetching all journey data.
   * @returns {Promise} - Contains the journey data when fulfilled
   */
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

  /**
   * A connection function for fetching all station names and ids.
   * @returns {Promise} - Contains all station names and ids when fulfilled
   */
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

  /**
   * A connection function for fetching station data based on the station id.
   * @param {string} id - The id of the station
   * @returns {Promise} - Contains station data when fulfilled
   */
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

  /**
   * A connection function for fetching the count of the starting journeys from the station.
   * @param {string} id - The id of the station
   * @returns {Promise} - Contains the count of the starting journeys when fulfilled
   */
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

  /**
   * A connection function for fetching the count of the ending journeys at the station.
   * @param {string} id - The id of the station
   * @returns {Promise} - Contains the count of the ending journeys when fulfilled
   */
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
