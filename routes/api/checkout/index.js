const express = require('express');
const checkoutController = require('../../../controllers/checkout/checkoutController');
const paymentSuccessController = require('../../../controllers/checkout/paymentSuccessController');
const paymentFailController = require('../../../controllers/checkout/paymentFailController');
const paymentCancelController = require('../../../controllers/checkout/paymentCancelController');
const _ =  express.Router();

_.post('', checkoutController)
_.post('/success/:transid', paymentSuccessController)
_.post('/fail/:transid', paymentFailController)
_.post('/cancel/:transid', paymentCancelController)
// _.get('/dashboard/alluser', getalluserController)
// _.delete('/dashboard/deleteuser/:id', deleteUserController)


module.exports = _;