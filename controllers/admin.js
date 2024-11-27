const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.PostEditProduct = (req, res, next) => {
  const id = req.body.productId ;
  Product.fetchID(id , product => {
  res.render('admin/edit-product' , {
    pageTitle : 'edit product' ,
    path : '/admin/products' ,
    prods : product,
    ProductID : id
  });
  });
  };

  exports.PostFinishedEdit = (req,res,next) => {
  Product.EditProduct(req.body.title , req.body.imageUrl , req.body.price , req.body.description ,req.body.productID ,
    () => res.redirect('/') );
  }

  exports.PostDeleteProduct = (req , res , next) => {
    Product.DeleteProduct(req.body.productId , () => Cart.DeleteCart(req.body.productId , () => 
            res.redirect('/')) ) ;
    

    
  }

