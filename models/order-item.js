const Sequelize = require('sequelize') ;

const sql = require('../util/database') ;


const orderItem = sql.define('OrderItem' , {
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


module.exports = orderItem ;

