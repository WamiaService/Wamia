const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Admin = require('./admin');

const Services = require('./services');

const Provider = sequelize.define('provider', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
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
  patente: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  mobile: DataTypes.INTEGER,

  category: {
    type: DataTypes.ENUM(
      'electricien',
      'climatisation',
      'plombier',
      'transporteur',
      'peinture',
      'machine a laver',
      'menuisier',
      'camera'
    ),
  },

  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Provider.belongsTo(Admin);

Provider.belongsTo(Services);


module.exports = Provider;
