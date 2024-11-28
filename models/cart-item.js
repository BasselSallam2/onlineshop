const Sequelize = require('sequelize') ;

const sql = require('../util/database') ;


const cartItem = sql.define('cartItem' , {
id : {
  type:Sequelize.INTEGER ,
  autoIncrement:true,
  allowNull:false,
  unique:true,
  primaryKey:true
} ,
quantity : {
    type:Sequelize.INTEGER,
}
});


module.exports = cartItem ;

