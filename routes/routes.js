/**
 * Express router providing routes for fetching city bike journey related data.
 * @module routes/routes
 */

const express = require("express");
const router = express.Router();
const connection = require("../database/database.js");

/**
 * A route for fetching the journey data from the database.
 * @param {string} path - the URL path
 * @param {callback} handler - Express handler function: executed when the route is matched
 */
router.get("/journey_data", async (req, res) => {
  try {
    let data = await connection.fetchAllJourneyData();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

/**
 * A route for fetching the bike station names and ids from the database.
 * @param {string} path - the URL path
 * @param {callback} handler - Express handler function: executed when the route is matched
 */
router.get("/stations", async (req, res) => {
  try {
    let data = await connection.fetchAllStationNames();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

/**
 * A route for fetching station data based on the station id.
 * @param {string} path - the URL path
 * @param {callback} handler - Express handler function: executed when the route is matched
 */
router.get("/stations/:id", async (req, res) => {
  try {
    let data = await connection.fetchStationData(req.params.id);
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

/**
 * A route for fetching the count of starting journeys from the station based on the station id.
 * @param {string} path - the URL path
 * @param {callback} handler - Express handler function: executed when the route is matched
 */
router.get("/journey_data/start/:id", async (req, res) => {
  try {
    let data = await connection.fetchJourneyStartCount(req.params.id);
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

/**
 * A route for fetching the count of ending journeys at the station based on the station id.
 * @param {string} path - the URL path
 * @param {callback} handler - Express handler function: executed when the route is matched
 */
router.get("/journey_data/end/:id", async (req, res) => {
  try {
    let data = await connection.fetchJourneyEndCount(req.params.id);
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

module.exports = router;
