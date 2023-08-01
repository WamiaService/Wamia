const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Custumor = require('./custumor')

const Services = sequelize.define('admin', {
  name: DataTypes.STRING,
  img: DataTypes.STRING,
  desc: DataTypes.STRING,
});

Services.belongsTo(Custumor)


module.exports = Services;