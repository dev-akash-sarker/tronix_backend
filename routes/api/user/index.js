const express = require('express');
const getalluserController = require('../../../controllers/user/getalluserController');
const deleteUserController = require('../../../controllers/user/deleteuserController');
const _ =  express.Router();

_.get('/dashboard/alluser', getalluserController)
_.delete('/dashboard/deleteuser/:id', deleteUserController)


module.exports = _;
