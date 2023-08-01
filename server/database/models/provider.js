const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Admin = require('./admin');
const Services = require('./services')

const Provider = sequelize.define('provider', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  adresse : DataTypes.STRING,
  email : DataTypes.STRING,
  imgprof: DataTypes.STRING,
  patente : DataTypes.STRING,
  mobile: DataTypes.INTEGER,

  category: {
    type: DataTypes.ENUM('electricien', 'climatisation', 'plombier', 'transporteur', 'peinture', 'machine a laver', 'menuisier', 'camera'),
    
  },

  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  }
});

Provider.belongsTo(Admin);
Provider.belongsTo(Services)

module.exports = Provider;