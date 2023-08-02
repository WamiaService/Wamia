const Sequelize = require('sequelize');


const sequelize = new Sequelize('wamia', 'yacine', 'yacine251203**', {

    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    sync: false,
  });

  sequelize
  .query('CREATE DATABASE IF NOT EXISTS `wamia`;') 
  .then(() => {console.log("db connected")})
  .catch((error) => {
    console.error('Unable to create the database:', error);
    sequelize.close();
  });


module.exports = sequelize;