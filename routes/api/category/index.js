const express = require('express');
const addCategoryController = require('../../../controllers/categories/addCategoryController');
const addSubCategoryController = require('../../../controllers/categories/addSubCategoryController');
const getCategoryController = require('../../../controllers/categories/getCategoryController');
const getSubcategoryController = require('../../../controllers/categories/getSubcategoryController');
const _ =  express.Router();

_.post('/dashboard/addcategories', addCategoryController)
_.post('/dashboard/addsubcategories', addSubCategoryController)
_.get('/allcategory', getCategoryController)
_.get('/:id/subcategory', getSubcategoryController)


module.exports = _;
