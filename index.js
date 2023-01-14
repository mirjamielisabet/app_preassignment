const connection = require("./database/database.js");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const server = app.listen(port, async () => {
  console.log(`Listening on port ${server.address().port}`);
});

const shutdown = () => {
  console.log("Closing HTTP server");
  server.close(async () => {
    console.log("HTTP server closed");
    try {
      await connection.close();
      console.log("mysql connection closed");
    } catch (err) {
      console.log(err);
    }
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
