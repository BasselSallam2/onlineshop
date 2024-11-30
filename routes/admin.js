const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/Finished-edit' , adminController.PostFinishedEdit);

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product' , adminController.PostEditProduct ) ;



router.post('/delete-product' , adminController.PostDeleteProduct);

module.exports = router;
