const express = require('express');
const checkoutController = require('../../../controllers/checkout/checkoutController');
const _ =  express.Router();

_.post('', checkoutController)
// _.get('/dashboard/alluser', getalluserController)
// _.delete('/dashboard/deleteuser/:id', deleteUserController)


module.exports = _;