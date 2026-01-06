const express = require('express');
const addCategoryController = require('../../../controllers/categories/addCategoryController');
const addSubCategoryController = require('../../../controllers/categories/addSubCategoryController');
const getCategoryController = require('../../../controllers/categories/getCategoryController');
const getSubcategoryController = require('../../../controllers/categories/getSubcategoryController');
const viewSubcategoryController = require('../../../controllers/categories/viewSubcategoryController');
const deleteSubcategoryController = require('../../../controllers/categories/deleteSubcategoryController');
const deleteCategoryController = require('../../../controllers/categories/deleteCategoryController');
const _ =  express.Router();

_.post('/addcategories', addCategoryController)
_.post('/addsubcategories', addSubCategoryController)
_.get('/allcategory', getCategoryController)
_.get('/viewsubcategory', getSubcategoryController)
_.get("/viewsubcategories", viewSubcategoryController);
_.delete("/deletecategory/:id", deleteCategoryController);
_.delete("/deletesubcategory/:id", deleteSubcategoryController);

module.exports = _;
