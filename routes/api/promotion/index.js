const express = require('express');
const getPromotionController = require('../../../controllers/promotion/getPromotionController');
const createPromotionController = require('../../../controllers/promotion/createPromotionController');
const _ =  express.Router();

_.post('/createpromotion', createPromotionController)
_.get('/getpromotion', getPromotionController)

module.exports = _;
