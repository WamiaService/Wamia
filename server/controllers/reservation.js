const Reservation=require('../database/models/reservation')
const { Op } = require("sequelize");

// post date 
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
  getOneRerservation,
  bookDate
}
