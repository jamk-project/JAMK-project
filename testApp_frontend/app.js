const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const index = require('./routes/index');
const api = require('./routes/api');

const app = express();

const requestTime = (req, res, next) => {
  console.log(`requestTime: ${Date.now()}`);
  next();
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestTime);
app.use('/', index);
app.use('/api/', api);

module.exports = app;
