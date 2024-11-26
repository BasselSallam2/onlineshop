const express = require('express') ;
const router = express.Router() ;
const adminController = require('../Controller/admin') ;

router.get('/add-product' ,adminController.Getaddproducts ) ;
router.get('/admin-products' ,adminController.Getadminproducts ) ;

router.post('/added-product' , adminController.postaddproducts) ;

module.exports = router ;