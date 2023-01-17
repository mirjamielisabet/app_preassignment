const express = require("express");
const router = express.Router();
const connection = require("../database/database.js");

router.get("/journey_data", async (req, res) => {
  try {
    let data = await connection.fetchAllJourneyData();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

router.get("/stations", async (req, res) => {
  try {
    let data = await connection.fetchAllStationData();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

module.exports = router;
