const express = require('express') ;
const router = express.Router() ;
const shopController = require('../Controller/shop') ;

router.get('/shop' , shopController.GetShop );

router.get('/shop-products' , shopController.GetShopproducts) ;

router.get('/cart' , shopController.Getcart) ;

router.get('/orders' , shopController.Getorders) ;



module.exports = router ;