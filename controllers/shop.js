const Product = require('../models/product');
const Cart = require('../models/cart') ;

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows , datafield]) => {
    res.render('shop/product-list' ,{
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch((err) => {
    console.log(err) ;
  });
};

exports.postProductDetails = (req, res, next) => {
const id = req.params.productId ;
Product.fetchID(id).then(([result]) => {
    res.render('shop/product-detail' , {
    pageTitle : 'product details' ,
    path : '/products' ,
    product : result[0]
  });
}).catch((err) =>{
  console.log(err) ;
});
};










exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows , datafield]) => {
    res.render('shop/index.ejs' ,{
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch((err) => {
    console.log(err) ;
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