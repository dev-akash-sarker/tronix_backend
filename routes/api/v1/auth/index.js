const express = require('express');
const registrationController = require('../../../../controllers/registrationController');
const secureAPI = require('../../../../middleware/secureAPI');
const _ = express.Router();

_.get('/register',secureAPI, registrationController)

// hellosdsd
module.exports = _;