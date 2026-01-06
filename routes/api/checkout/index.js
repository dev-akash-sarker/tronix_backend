const express = require('express');
const checkoutController = require('../../../controllers/checkout/checkoutController');
const paymentSuccessController = require('../../../controllers/checkout/paymentSuccessController');
const _ =  express.Router();

_.post('', checkoutController)
_.post('/success/:transid', paymentSuccessController)
// _.get('/dashboard/alluser', getalluserController)
// _.delete('/dashboard/deleteuser/:id', deleteUserController)


module.exports = _;