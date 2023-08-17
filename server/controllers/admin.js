const Custumor = require("../database/models/custumor");
const Provider = require("../database/models/provider");
const Reservation = require("../database/models/reservation");

module.exports = {
  getAllCustumor(req, res) {
    Custumor.findAll()
      .then((custumors) => {
        res.status(200).json(custumors);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to get custumors" });
      });
  },
  getAllProviders(req, res) {
    Provider.findAll()
      .then((providers) => {
        res.status(200).json(providers);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to get providers" });
      });
  },
  deleteCustumor(req, res) {
    const { custumorid } = req.params;

    Custumor.destroy({ where: { id: custumorid } })
      .then((rowsDeleted) => {
        if (rowsDeleted === 0) {
          return res.status(404).json({ error: `custumor not found` });
        }
        res.status(200).json({ message: `custumor deleted successfully` });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: `Failed to delete custumor` });
      });
  },
  deleteProvider(req, res) {
    const { providerid } = req.params;

    Provider.destroy({ where: { id: providerid } })
      .then((rowsDeleted) => {
        if (rowsDeleted === 0) {
          return res.status(404).json({ error: `provider not found` });
        }
        res.status(200).json({ message: `provider deleted successfully` });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: `Failed to delete provider` });
      });
  },
  getNpProviders(req, res) {
    Provider.findAll({
      where: {
        is_approvede: false, 
      },
    })
      .then((providers) => {
        res.status(200).json(providers);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to get providers" });
      });
  },
  updateProvider(req, res) {
    const id = req.params.id;

    Provider.update({ is_approvede: true }, { where: { id: id } })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to update provider" });
      });
  },
  getAllReservation(req, res) {
    Reservation.findAll({
      where: {
        status: 'accepted', 
      },
      include: [
        {
          model: Provider, 
        },
      ],
    })
      .then((reservations) => {
        res.status(200).json(reservations);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to get reservations" });
      });
  },
  
};
