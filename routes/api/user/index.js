const express = require('express');
const getalluserController = require('../../../controllers/user/getalluserController');
const deleteUserController = require('../../../controllers/user/deleteuserController');
const newUserByOrderController = require('../../../controllers/user/newUserByOrderController');
const userLoginController = require('../../../controllers/auth/userLoginController');
const _ =  express.Router();

_.get('/dashboard/alluser', getalluserController)
_.delete('/dashboard/deleteuser/:id', deleteUserController)
_.post('/adduserbyorder', newUserByOrderController)
_.post('/userlogin', userLoginController)


module.exports = _;
