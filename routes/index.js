const express = require('express')
const _ =  express.Router();
const APIDIR = require('./api')
_.use('/', APIDIR)

module.exports = _;
