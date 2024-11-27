const Product = require('../models/product');
const Cart = require('../models/cart') ;

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.postProductDetails = (req, res, next) => {
const id = req.params.productId ;
Product.fetchID(id , product => {
res.render('shop/product-detail' , {
  pageTitle : 'product details' ,
  path : '/products' ,
  product : product
});
});
};










exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};



exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.getCart = (req, res, next) => {
  Cart.fetchCart(products => {
    res.render('shop/cart', {
      prods: products,
      pageTitle: 'Cart',
      path: '/cart'
    });
  });
};

exports.postCart = (req, res, next) => {
  Cart.AddtoCart(
    req.body.product_id, 
    req.body.product_price, 
    req.body.product_url, 
    req.body.product_title, 
    () => {
      Cart.fetchCart(products => {
        res.render('shop/cart', {
          prods: products,
          pageTitle: 'Cart',
          path: '/cart'
        });
      });
    }
  );
};


exports.PostDeleteCart = (req , res , next) => {
   const ID = req.body.product_id ;
   Cart.DeleteCart(ID , () => res.redirect('/cart')) ;
};