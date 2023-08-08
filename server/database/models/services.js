const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Provider = require('./provider');

const Services = sequelize.define('services', {
  name: DataTypes.STRING,
  img: DataTypes.STRING,
  desc: DataTypes.STRING,
});




Services.belongsTo(Provider);
module.exports = Services;