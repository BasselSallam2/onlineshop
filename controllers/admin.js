const { where } = require('sequelize');
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
  req.user.createProduct({
    title:title ,
    price:price ,
    imageUrl:imageUrl,
    description:description ,
    userUserID: req.user.userID
  }).then(() => res.redirect('/')) 
  .catch((err) => {
    console.log(err) ;
  });  
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then( products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(err) ;
  })
};

exports.PostEditProduct = (req, res, next) => {
  const id = req.body.productId ;
  req.user.getProducts({where: {productID : id}})
  /*Product.findByPk(id)*/.then(product => {
    console.log(product) ;
    res.render('admin/edit-product' , {
    pageTitle : 'edit product' ,
    path : '/admin/products' ,
    prods : product[0],
    ProductID : id,
  });
  }).catch(err => {
    console.log(err) ;
  });
  };

  exports.PostFinishedEdit = (req,res,next) => {
  Product.findByPk(req.body.productID).then(product => {
    product.title = req.body.title  ;
    product.price = req.body.price ;
    product.imageUrl =  req.body.imageUrl ;
    product.description = req.body.description ;
    return product.save();
  }).then(() => res.redirect('/') )
  .catch(err => {
    console.log(err) ;
  });
  };

  exports.PostDeleteProduct = (req , res , next) => {
  Product.destroy({where: {productID: req.body.productId}})
  .then(() => res.redirect('/'))
  .catch(err => {
    console.log(err) ;
  });
  };

