const express = require('express');
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
  /* res.json({
    confirmation: 'success',
    data: 'home page'
  }); */
  res.render('index', { title: 'Express' });
});

module.exports = router;
