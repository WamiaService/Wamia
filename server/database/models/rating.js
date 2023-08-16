const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Provider = require('./provider')
const Custumor = require('./custumor')


const Rating = sequelize.define('rating', {
rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
   
  },

  review: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  });

Rating.belongsTo(Provider)
Rating.belongsTo(Custumor)





  module.exports = Rating;
