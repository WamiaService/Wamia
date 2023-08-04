const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Admin = require('./admin');

const Custumor = sequelize.define('custumor', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgprof: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   mobile: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }


});

Custumor.belongsTo(Admin);

module.exports = Custumor;
