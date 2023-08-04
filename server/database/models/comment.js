const { DataTypes } = require('sequelize')
const sequelize=require('../db')
const Provider = require('./provider')
const Custumor = require('./custumor')


const Comment = sequelize.define('comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })


Comment.belongsTo(Provider)
Comment.belongsTo(Custumor)


module.exports = Comment