const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.post('/products/:productId', shopController.postProductDetails );

router.post('/cart' , shopController.postCart) ;

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post('/cartDeleted' , shopController.PostDeleteCart) ;

module.exports = router;