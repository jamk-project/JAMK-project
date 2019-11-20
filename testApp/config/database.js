const mysql = require("mysql");

// Create connection
module.exports = mysql.createConnection({
  host: "37.139.21.68",
  user: "dilemma",
  password: "4V1GEPPn",
  database: "dilemma",
  charset: "utf8mb4"
  // host: "dilemmatest.mysql.database.azure.com",
  // user: "dilemma@dilemmatest",
  // password: "Trideaproject12#",
  // database: "dilemmatest"
  // charset: "utf8mb4"
});
