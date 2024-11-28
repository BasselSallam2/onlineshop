const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database') ;

const Products = require('./models/product') ;
const Users = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order') ;
const OrderItem = require('./models/order-item') ;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');




app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req , res , next) => {
    Users.findByPk(1) 
    .then(user => {
        req.user = user ;
        next() ;
    })
    .catch(err => {
        console.log(err) ;
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Products.belongsTo(Users , {constraints : true , onDelete: 'CASCADE'}) ;
Users.hasMany(Product) ;
Users.hasOne(Cart) ;
Cart.belongsTo(Users) ;
Cart.belongsToMany(Product , {through: CartItem}) ;
Product.belongsToMany(Cart , {through: CartItem}) ;
Order.belongsTo(Users);
Users.hasMany(Order) ;
Order.belongsToMany(Product , {through : OrderItem}) ;
Product.belongsToMany(Order , {through : OrderItem}) ;







sequelize.sync()
  .then(() => Users.findByPk(1))
  .then(user => {
    if (!user) {
      return Users.create({ name: 'Bassel', email: 'Bassela.sallam@gmail.com' });
    }
    return user; // Return the user to the next .then() block
  })
  .then(user => {
    // Now `user` is available again in this block
    return user.getCart().then(cart => {
      if (!cart) {
        return user.createCart(); // Create a cart if none exists
      }
    });
  })
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
