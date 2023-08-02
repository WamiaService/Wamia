const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Provider = require('./provider')
const Custumor = require('./custumor')


const Reservation = sequelize.define('reservation', {
    date: {
      type :DataTypes.DATEONLY,
    allowNull:false,
    unique:true
  },
  isBooked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}
  );

  Reservation.belongsTo(Provider)
  Reservation.belongsTo(Custumor)


  module.exports = Reservation;
