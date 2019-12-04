const express = require('express');
const db = require("../config/database");

const router = express.Router();

// testing
router.use(
  (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
  }, (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
  });

// GET home page
router.get('/', (req, res) => {
  res.json({
    confirmation: 'success',
    data: 'home page'
  });
});

// GET ads
router.get(
  "/ads", (req, res) => {
    /* res.json({
      confirmation: 'success',
      data: 'ads'
    }); */
    let sql = `SELECT * FROM ad`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
);

// GET campaigns
router.get(
  "/campaigns",
  (req, res) => {
    /* res.json({
      confirmation: 'success',
      data: 'campaigns'
    }); */
    let sql = `SELECT * FROM campaign`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }
);


module.exports = router;
