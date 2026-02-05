const express = require('express');
const addBannerController = require('../../../controllers/banner/addBannerController');
const { bannerParser } = require('../../../config/cloudinary');
const _ =  express.Router();

_.post('/addbanner',bannerParser.array("banners", 10), addBannerController)


module.exports = _;
