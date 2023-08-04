
const Reservation=require('../database/models/reservation')
const { Op } = require("sequelize");

// get all reservation

const getAllRerservation = async (req, res) => {
  try {
    const reservation= await Reservation.findAll();
    res.status(200).json(reservation);
  } catch (error) {
    console.error('Get reservation Error:', error);
    res.status(500).json({ error: 'Failed to find  ' });
  }
};
// get  all  reservation for one custumor 
const getOneRerservation = async (req, res) => {
  try {
    const onereservation= await Reservation.findAll ({
      where: {
        custumorId: {
          [Op.eq]: '?'
        }
      }
    });
    res.status(200).json(onereservation);
  } catch (error) {
    console.error('Get onereservation Error:', error);
    res.status(500).json({ error: 'Failed to find a reservation  ' });
  }
};



module.exports = {
  getAllRerservation,
  getOneRerservation
}