const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Admin = sequelize.define('admin', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = Admin;
