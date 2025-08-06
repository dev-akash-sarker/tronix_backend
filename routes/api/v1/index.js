const express = require('express');
const _ = express.Router();
const authapi = require('./auth')
_.use('/auth', authapi)

module.exports = _;