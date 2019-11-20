const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");
const moment = require("moment");
const uuid = require("uuid");
const bodyParser = require("body-parser");

// Database
const db = require("./config/database");

// Connect to db
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

const app = express();

const whitelist = [
  "http://bislenz.com",
  "https://bislenz.com",
  "http://52.31.66.65"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// corsOptions
//app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", routes);
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
