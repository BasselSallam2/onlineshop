const { Sequelize } = require('sequelize'); // Correct import for Sequelize

const sequelize = new Sequelize('node-complete','root' ,'bassel12' , {
    dialect: 'mysql' ,
    host: 'localhost'
});

module.exports = sequelize ;