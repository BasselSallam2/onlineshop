const Product = require('../models/product');
const Cart = require('../models/cart') ;
const { where } = require('sequelize');
const Order = require('../models/order') ;
const CartItem = require('../models/cart-item') ;

exports.getProducts = (req, res, next) => {
  //Product.findAll()
  req.user.getProducts()
  .then((products) => {
    res.render('shop/product-list' ,{
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch((err) => {
    console.log(err) ;
  });
};

exports.postProductDetails = (req, res, next) => {
const id = req.params.productId ;
Product.findByPk(id).then((result) => {
    res.render('shop/product-detail' , {
    pageTitle : 'product details' ,
    path : '/products' ,
    product : result
  });
}).catch((err) =>{
  console.log(err) ;
});
};










exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('shop/index.ejs' ,{
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch((err) => {
    console.log(err) ;
  });

};







exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.getProducts() 
  })
  .then(products => {
    res.render('shop/cart', {
          prods: products,
          pageTitle: 'Cart',
          path: '/cart'
        })
  })
  .catch(err => {
    console.log(err) ;
  })
  // Cart.fetchCart(products => {
  //   res.render('shop/cart', {
  //     prods: products,
  //     pageTitle: 'Cart',
  //     path: '/cart'
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  let id = req.body.product_id;
  let fetchcart;

  req.user
    .getCart() // Fetch the cart of the logged-in user
    .then(cart => {
      fetchcart = cart;
      // Get the products in the cart that match the productID
      return cart.getProducts({ where: { productID: id } });
    })
    .then(products => {
      if (products.length === 0) {
        // If the product does not exist in the cart, find the product in the database
        return Product.findByPk(id)
          .then(product => {
            // After finding the product, add it to the cart with quantity 1
            return fetchcart.addProduct(product, { through: { quantity: 1 } });
          });
      } else {
        // If the product is already in the cart, get the first matching CartItem
        const cartItem = products[0]; // Assuming there's only one product in the cart for this productID
        const newQuantity = cartItem.cartItem.quantity + 1; // Increment the quantity by 1

        // Ensure that cartItem is properly accessed and updated
        return cartItem.cartItem.update({ quantity: newQuantity }); // Update the quantity in the CartItem table
      }
    })
    .then(() => {
      res.redirect('/cart'); // Redirect to the cart page after adding or updating the product
    })
    .catch(err => {
      console.log(err);
      res.redirect('/'); // Redirect to the homepage or show an error page
    });
};



exports.PostDeleteCart = (req , res , next) => {
  const ID = req.body.product_id ;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where : {productID : ID}})
  })
  .then(products => {
    const theproduct  = products[0] ;
    return theproduct.cartItem.destroy();
  })
  .then(() => {
    res.redirect('/cart') ;
  })
  .catch(err => {
    console.log(err) ;
  });
}


exports.PostCheckout = (req , res , next) => {
req.user.getCart()
.then((cart) =>{
  return cart.getProducts() ;
})
.then((products) => {
  return req.user.createOrder()
  .then((order) => {
    products.map(product => {
      order.addProduct(product , {through : {quantity : product.cartItem.quantity }});
    });
  })
  .catch()
})
.then(() => {
    CartItem.destroy({where : {cartId : 1}}) ;
})
.then(() => res.redirect('/orders'))
.catch((err) => {
  console.log(err) ;
});

};




exports.getOr = (req, res, next) => {
  req.user.getOrders({include : ['products']})
  .then((order) => {
    console.log(order) ;
    res.render('shop/orders', {
      orders: order ,
      path: '/orders',
      pageTitle: 'Your Orders'
    })
  })
  .catch() ;
  
};