const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Message = require('./messages');
const Admin = sequelize.define('admin', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
},
{ timestamps: false }
);

Admin.hasMany(Message, { foreignKey: 'senderId' });
Admin.hasMany(Message, { foreignKey: 'receiverId' })

module.exports = Admin;
