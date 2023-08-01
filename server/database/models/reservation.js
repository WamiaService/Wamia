const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Provider = require('./provider')
const Custumor = require('./custumor')


const Reservation = sequelize.define('reservation', {
    date: DataTypes.DATE
  });

  Reservation.belongsTo(Provider)
  Reservation.belongsTo(Custumor)





  module.exports = Reservation;
