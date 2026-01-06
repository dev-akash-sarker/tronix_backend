const express = require('express');
const createFeatureController = require('../../../controllers/featuredproduct/createFeatureController');
const viewfeatureController = require('../../../controllers/featuredproduct/viewfeatureController');
const _ =  express.Router();

_.post('/createfeatureproduct', createFeatureController)
_.get('/getfeatureproduct', viewfeatureController)

module.exports = _;
