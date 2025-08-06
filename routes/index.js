const express = require('express');
const _ = express.Router();
const API = require('./api')
_.use('/api', API)

module.exports = _;