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
  role:{
    type:DataTypes.STRING,
    defaultValue:"custumor",
    allowNull:false,
},
  mobile: DataTypes.INTEGER,
  is_approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  activationCode : DataTypes.STRING

},
{ timestamps: false });

;

module.exports = Custumor;
