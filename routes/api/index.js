const express = require('express');
const _ = express.Router();
const VERSION = require('./v1')
_.use('/v1', VERSION)

module.exports = _;