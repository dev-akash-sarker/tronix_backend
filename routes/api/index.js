const express = require('express')
const _ =  express.Router();
const AUTHDIR = require('./auth')
const categoryDir = require('./category')
const productDir = require('./product')
const userDir = require('./user')
const checkoutindex = require('./checkout')
_.use('/api/v1', AUTHDIR )
_.use('/api/v1/category', categoryDir )
_.use('/api/v1/product', productDir )
_.use('/api/v1/user', userDir)
_.use('/api/v1/checkout',  checkoutindex)

module.exports = _;
