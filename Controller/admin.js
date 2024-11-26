const Products = require('../Moduels/admin') ;

exports.Getaddproducts = (req , res , next) => {
    res.render('admin/add-product.ejs' , {
        pageTitle : 'add-product' ,
        path : 'add-product'
    }) ;
    
    }

    exports.Getadminproducts = (req , res , next) => {
        Products.fitchAll(prods => {
    
            res.render('admin/admin-prdoucts.ejs' , {
                producat : prods ,
                pageTitle : 'Admin Products' ,
                path : 'admin-products' ,
                
        
        
            }) ;
        });
        
        }
    
    
 exports.postaddproducts = (req,res,next) => {
    const productname = req.body.productName ;
    const productimage = req.body.productImage ;
    const productdescription = req.body.productDescription;
    const productprice = req.body.productPrice;
    const newproduct = new Products(productname,productimage,productdescription,productprice);
    newproduct.save();
    res.redirect('/shop/shop') ;

 }