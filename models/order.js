const Sequelize = require('sequelize') ;

const sql = require('../util/database') ;


const order = sql.define('Order' , {
id : {
  type:Sequelize.INTEGER ,
  autoIncrement:true,
  allowNull:false,
  unique:true,
  primaryKey:true
}
});


module.exports = order ;