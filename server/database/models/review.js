const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Provider = require('./provider')
const Custumor = require('./custumor')


const Review = sequelize.define('review', {

  review: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  });

Review.belongsTo(Provider)
Review.belongsTo(Custumor)





  module.exports = Review;
