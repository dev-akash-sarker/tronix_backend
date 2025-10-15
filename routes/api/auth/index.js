const express = require('express')
const _ =  express.Router();
const secureAPI = require('../../../middleware/secureAPI');

const RegisterAdminController = require('../../../controllers/Admin/registerAdminController');
const LoginAdminController = require('../../../controllers/Admin/loginAdminController');
const RegistrationController = require('../../../controllers/auth/registrationController');
const LoginController = require('../../../controllers/auth/loginController');
const otpController = require('../../../controllers/otpController');
const CheckAdminController = require('../../../controllers/Admin/checkAdminController');

// http://localhost:8000/api/v1/admin/login
// admin authetication
_.post('/admin/login', LoginAdminController)
_.post('/admin/registration', secureAPI, RegisterAdminController)
_.get('/check-admin', CheckAdminController)

// user authentication
_.get('/login' , LoginController);
_.post('/registration' , RegistrationController);
_.get('/verification', otpController)

// add categories and subcategories






module.exports = _;
