const express = require('express');
const viewOrderController = require('../../../controllers/order/viewOrderController');
const updateStatusController = require('../../../controllers/order/updateStatusController');
const _ =  express.Router();

// _.get('/dashboard/alluser', getalluserController)
// _.delete('/dashboard/deleteuser/:id', deleteUserController)
// _.post('/adduserbyorder', newUserByOrderController)

_.get('/vieworders', viewOrderController)
_.patch('/updatestatus/:id', updateStatusController)


module.exports = _;
