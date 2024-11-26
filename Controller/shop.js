const Products = require('../Moduels/admin') ;


exports.GetShop = (req , res , next) => {
    Products.fitchAll(prods => {

        res.render('shop/shop.ejs' , {
            producat : prods ,
            pageTitle : 'Shop' ,
            path : 'shop' ,
            
    
    
        }) ;
    });
    
    }


    exports.GetShopproducts = (req , res , next) => {
        res.render('shop/shop-products.ejs' , {
            pageTitle : 'Shop Products' ,
            path : 'shop-products'
        }) ;
        
        }


     exports.Getcart = (req , res , next) => {
            res.render('shop/cart.ejs' , {
                pageTitle : 'Cart' ,
                path : 'cart'
            }) ;
            
            }   

     exports.Getorders = (req , res , next) => {
                res.render('shop/orders.ejs' , {
                    pageTitle : 'Orders' ,
                    path : 'orders'
                }) ;
                
                }          