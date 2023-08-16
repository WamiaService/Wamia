// controllers/payment.js
const stripe = require("stripe")("sk_test_51NdUs4K6fT8eoEEpBbnFibRAsIRToDOQVt8iLAnnZFgrAIzj7CT2an0MzBuwrlkmeSdS53wwBQyuxGswaDBnGCgg00nBHMJfeF");
const Provider = require('../database/models/provider'); // Import the Provider model

module.exports = {
  intent: async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "EUR",
        payment_method_types: ["card"],
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  },
  success: async (req, res) => {
    try {
      const providerId = req.params.providerId;
      // Update the ispay field for the provider with the given ID
      await Provider.update({ ispay: true }, {
        where: { id: providerId }
      });

      res.status(200).json({ message: "Payment successful" });
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  },
};
