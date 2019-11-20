const express = require("express");
const db = require("../config/database");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");
const moment = require("moment");

// Mahdollinen bokun IP range
// 52.0.0.0 - 52.31.255.255 (52.0.0.0/11)
// varmat
// 52.50.153.141
// 52.31.66.65
const whitelist = ["http://bislenz.com", "https://bislenz.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

var developertila = true; //kehitystä varten, corsien poisto
var tila;

if (developertila === false) {
  tila = corsOptions;
} else {
  tila = "";
}

// Select ads
router.get(
  "/",
  (req, res) =>
    res.json("opiskelija: Leevi")
)

// Select ads
router.get(
  "/ads",
  cors(tila),
  // cors(),
  (req, res) => {
    let sql = `SELECT * FROM ad`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
);

// Select campaigns
router.get(
  "/campaigns",
  cors(tila),
  // cors(),
  (req, res) => {
    let sql = `SELECT * FROM campaign`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
);

module.exports = router;
