const Sequelize = require('sequelize') ;

const sql = require('../util/database') ;


const cart = sql.define('cart' , {
id : {
  type:Sequelize.INTEGER ,
  autoIncrement:true,
  allowNull:false,
  unique:true,
  primaryKey:true
}
});


module.exports = cart ;