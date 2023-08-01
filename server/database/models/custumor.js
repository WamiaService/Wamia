const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Admin = require('./admin');

const Custumor = sequelize.define('custumor', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  adresse : DataTypes.STRING,
  email : DataTypes.STRING,
  imgprof: DataTypes.STRING,
  identity : DataTypes.STRING,

 
});

Custumor.belongsTo(Admin);

module.exports = Custumor;