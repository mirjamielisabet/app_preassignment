const express = require("express");
const router = express.Router();
const connection = require("../database/database.js");

router.get("/", async (req, res) => {
  try {
    let data = await connection.fetch();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Requested data not found");
  }
});

module.exports = router;
