const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Admin = require('./admin');

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
    unique: true,
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
  role:{
    type:DataTypes.STRING,
    defaultValue:"provider",
    allowNull:false,
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
  activationCode : DataTypes.STRING
},
{ timestamps: false });

;
module.exports = Provider;
