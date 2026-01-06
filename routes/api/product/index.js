const express = require('express');
const { parser } = require('../../../config/cloudinary');
const AddProductController = require('../../../controllers/products/addProductController');
const viewallproductController = require('../../../controllers/products/viewallproductController');
const viewproductController = require('../../../controllers/products/viewproductController');
const deleteProductImages = require('../../../controllers/products/deleteProductImages');
const deleteImage = require('../../../controllers/products/deleteImage');
const uploadproductimageController = require('../../../controllers/products/uploadproductimage');
const updateProductController = require('../../../controllers/products/updateProductController');
const deleteProductController = require('../../../controllers/products/deleteProductController');
const productReviewController = require('../../../controllers/products/productReviewController');
const _ =  express.Router();

_.use(express.json())
_.use(express.urlencoded({ extended: true }));
_.post('/addproduct', parser.array("images", 5), AddProductController)
_.post('/add-review', productReviewController)
_.post('/image/id/:productId',parser.array("file", 5), uploadproductimageController)
_.get('/viewproducts', viewallproductController)
_.get('/:id', viewproductController)
_.delete('/image/:publicId', deleteProductImages)
_.delete('/delete', deleteImage)
_.delete('/deleteproduct/:id', deleteProductController)
_.put('/update/:productId',parser.array("images", 5), updateProductController)


module.exports = _;
