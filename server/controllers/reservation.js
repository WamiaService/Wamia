const Provider = require('../database/models/provider');
const Reservation=require('../database/models/reservation')
const Custumor = require('../database/models/custumor')
const { Op } = require("sequelize");

//! post date 
const bookDate = async (req, res) => {
  try {
    const { date, custumorId, providerId } = req.body;

    // Validate and parse the incoming date
    const bookingDate = new Date(date);

    if (isNaN(bookingDate)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const reservation = await Reservation.create({
      date: bookingDate,
      custumorId,    // Assuming customerId is the property name in the request body
      providerId     // Assuming providerId is the property name in the request body
    });

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};


//! get all reservation

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

//!getAll Reservation for One Provider

const getAllProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId; 

    const reservations = await Reservation.findAll({
      where: {
        providerId: providerId
      },
      include: [{ model: Custumor }] 
    });

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Get Provider Reservations Error:', error);
    res.status(500).json({ error: 'Failed to find reservations for the provider' });
  }
};


//!updateReservationStatus

const updateReservationStatus = async (req, res) => {
  try {
    const id=req.params.id
    console.log(req.body)
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    console.log("before",reservation)
    await reservation.update({ status: req.body.status });
    console.log("after",reservation)

    res.status(200).json({ message: 'Reservation status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  } 
};


module.exports = {
  getAllRerservation,
  getOneRerservation,
  bookDate,
  getAllProvider,
  updateReservationStatus
}
