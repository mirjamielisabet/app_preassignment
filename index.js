const connection = require("./database/database.js");
const routes = require("./routes/routes.js");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;

/**
 * Starts a server.
 */
const server = app.listen(port, async () => {
  console.log(`Listening on port ${server.address().port}`);
});

/**
 * Middleware functions: enables cors requests, serves the frontend as a static file
 * and directs the requests to the router.
 */
app.use(cors());
app.use(express.static("frontend/build"));
app.use("/", routes);

/**
 * Closes the server and mysql connection.
 */
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
